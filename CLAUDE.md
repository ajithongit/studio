# Remotion Studio — Agent Instructions

This is a zero-config Remotion video framework. Scenes are auto-discovered from `src/scenes/`.

## First-Time Setup (required after clone)

```bash
npm run setup
```

This single command (`scripts/setup.sh`) installs everything:
1. **Node packages** — Remotion, Three.js, react-three-fiber, rapier, postprocessing, GSAP, Lottie
2. **Python venv** — `.earshot-venv/` with Earshot (AI SFX) + librosa (beat detection)
3. **video-shotcraft** — Cloned to `.vendor/video-shotcraft/` (124 motion recipes)

If any tool is missing or broken, re-run `npm run setup`.

## Quick Start

```bash
npm start        # Opens Remotion Studio in browser
```

- `npm run build` — Renders full video to `out/video.mp4`
- `npx remotion render <SceneId> out/scene.mp4` — Render a single scene
- `npm run beat-detect -- public/audio/file.mp3 --out src/beats.ts` — Beat detection

## Creating a New Scene

1. Create a file in `src/scenes/` named `NNN_SceneName.tsx`
   - `NNN` = three-digit order (001, 002, 003...)
   - `SceneName` = PascalCase (no spaces)
   - Example: `003_ProductDemo.tsx`

2. The file MUST export exactly two things:

```tsx
import React from "react";
import { AbsoluteFill, useCurrentFrame, useVideoConfig } from "remotion";
import { COLORS, FONTS } from "../design/tokens";
import { fadeIn, slideIn } from "../design/animations";
import type { SceneConfig } from "./types";

export const config: SceneConfig = {
  id: "ProductDemo",
  title: "Product Demo",
  durationInSeconds: 5,
};

const ProductDemo: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  return (
    <AbsoluteFill style={{ backgroundColor: COLORS.bgPrimary }}>
      {/* Scene content */}
    </AbsoluteFill>
  );
};

export default ProductDemo;
```

3. Save. Remotion Studio auto-discovers it. No other files need editing.

## Files You Must NEVER Edit

- `src/Root.tsx` — auto-registers compositions
- `src/Video.tsx` — auto-composes scenes
- `src/scenes/index.ts` — auto-discovery engine
- `src/scenes/types.ts` — shared type definitions

## File Naming Rules

- Pattern: `NNN_PascalCaseName.tsx` (regex: `/^\d{3}_[A-Za-z0-9_]+\.tsx$/`)
- NNN determines playback order (001 first, 002 second, etc.)
- Files starting with `_` are ignored (templates/utilities)
- Gaps in numbering are OK (001, 003, 005)
- Each scene's `config.id` must be unique

## Available Animations

Import from `"../design/animations"`:

| Function | Signature | Returns | Use For |
|---|---|---|---|
| `fadeIn` | `(frame, delay?, duration?)` | `number` (0-1) | Opacity fade-in |
| `slideIn` | `(frame, direction?, delay?, distance?, duration?)` | `{transform, opacity}` | Slide + fade combo |
| `scalePop` | `(frame, fps, delay?, config?)` | `{transform, opacity}` | Bouncy scale entrance |
| `maskReveal` | `(frame, delay?, duration?)` | `{clipPath}` | Horizontal wipe reveal |
| `gentleFloat` | `(frame, fps, amplitude?)` | `{transform}` | Idle floating motion |
| `gentleTilt` | `(frame, delay?, maxDegrees?, duration?)` | `{transform}` | Rotation animation |
| `staggerDelay` | `(index, baseDelay?)` | `number` | Calculate stagger offset |

### Spring Presets

```ts
import { SPRING_CONFIG } from "../design/animations";
SPRING_CONFIG.gentle   // { damping: 20, stiffness: 100, mass: 0.8 }
SPRING_CONFIG.snappy   // { damping: 15, stiffness: 200, mass: 0.6 }
SPRING_CONFIG.soft     // { damping: 30, stiffness: 80, mass: 1 }
SPRING_CONFIG.bounce   // { damping: 10, stiffness: 150, mass: 0.5 }
```

## TradingView-Style Charts

Import from `"../design/components"`:

```tsx
import { TradingChart } from "../design/components";

<TradingChart
  width={980}
  height={520}
  direction="bearish"            // "bearish" | "bullish"
  color="#E05A47"                // primary candle color
  colorAlt="#34A853"             // opposite candle color
  seed={42}                      // deterministic data generation
  candleCount={45}               // number of candlesticks
  delay={2}                      // animation delay in frames
  showForecast                   // forecast cone at chart end
  forecastColor="#E05A47"        // forecast cone color
  showVolume                     // volume bars at bottom
  showMA                         // MA(7) + MA(20) moving averages
  showGrid                       // horizontal + vertical grid lines
  showPriceAxis                  // price labels + live price badge
  opacity={0.4}
/>
```

Features: Animated candlestick reveal (left→right), OHLCV data, MA(7) orange + MA(20) purple lines, volume bars, forecast cone with dashed trend lines, grid, price axis with live badge. All deterministic via `seed`.

## Three.js 3D Scenes (@remotion/three)

Create 3D scenes using Three.js + react-three-fiber synced to Remotion's frame clock:

```tsx
import { ThreeCanvas } from "@remotion/three";
import * as THREE from "three";

const My3DScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  return (
    <ThreeCanvas
      width={1080}
      height={1920}
      camera={{ position: [0, 2, 10], fov: 50 }}
      style={{ width: "100%", height: "100%" }}
    >
      <ambientLight intensity={0.4} />
      <directionalLight position={[5, 8, 5]} intensity={0.8} />
      <mesh rotation={[0, frame / fps, 0]}>
        <torusKnotGeometry args={[1, 0.3, 128, 32]} />
        <meshStandardMaterial color="#00BCD4" metalness={0.8} roughness={0.2} />
      </mesh>
    </ThreeCanvas>
  );
};
```

Installed packages:
- `three` + `@types/three` — 3D engine
- `@react-three/fiber` (v8) — React renderer for Three.js
- `@react-three/rapier` (v1) — Physics engine (note: use procedural math for seekable animations)
- `@react-three/postprocessing` (v2) — Bloom, glitch, vignette effects
- `@remotion/three` — Remotion ↔ Three.js bridge (`ThreeCanvas`)

**Important:** Rapier physics simulations are NOT frame-seekable. For deterministic Remotion animations, use procedural math (interpolate, spring, gravity formulas) instead of physics simulation.

## Beat Detection (librosa)

Analyze audio for beat-synced animations:

```bash
# Output TypeScript beat data to stdout
npm run beat-detect -- public/audio/voiceover.mp3

# Write to file
npm run beat-detect -- public/audio/voiceover.mp3 --fps 30 --out src/beats.ts
```

Generates:
```ts
export const BEAT_DATA = {
  tempo: 143.6,
  durationSeconds: 28.37,
  durationFrames: 851,
  beatFrames: [68, 82, 95, ...],
} as const;
```

Import in scenes for beat-synced keyframes.

## Video-Shotcraft Reference (motion recipes)

After `npm run setup`, 124 motion recipes are available in `.vendor/video-shotcraft/references/shots/`. Use these as reference for shot composition, camera movement patterns, and animation sequencing.

## Available Components

Import from `"../design/components"`:

### Headline

```tsx
<Headline
  text="Your Title"
  size={52}                        // default: FONT_SIZES.sceneTitle
  delay={0}                        // frames before reveal
  color={COLORS.textPrimary}       // text color
  style={{}}                       // extra CSS
/>
```

### Card

```tsx
<Card
  width={280}
  height={200}
  enterFrom="up"                   // "up" | "down" | "left" | "right"
  index={0}                        // stagger index
  delay={0}                        // base delay in frames
  popIn={false}                    // use scale-pop instead of slide
  style={{}}
>
  {children}
</Card>
```

### PhoneMockup

```tsx
<PhoneMockup
  scale={1}                        // 1 = full size iPhone 16
  delay={0}                        // entrance delay
  enterFrom="up"                   // entrance direction
  skipEntrance={false}
  style={{}}
>
  {/* Phone screen content */}
</PhoneMockup>
```

## Design Tokens

Import from `"../design/tokens"`:

```
COLORS.bgPrimary       "#F8F9FB"   warm off-white
COLORS.bgSecondary     "#F1F3F6"   pale gray
COLORS.textPrimary     "#17191F"   near-black
COLORS.textSecondary   "#777D87"   gray
COLORS.accent          "#00BCD4"   cyan
COLORS.accentAlt       "#2196F3"   blue
COLORS.accentLight     "#E3F2FD"   light blue
COLORS.brand           "#F4845F"   orange
COLORS.positive        "#34A853"   green (bullish)
COLORS.negative        "#E05A47"   red (bearish)
COLORS.gold            "#C9A84C"   gold
COLORS.cardBg          "#FFFFFF"
COLORS.cardBorder      "#E8EDF2"
COLORS.cardShadow      "rgba(27, 42, 74, 0.08)"
COLORS.white           "#FFFFFF"
COLORS.black           "#000000"

FONTS.heading          "SF Pro Display, Inter, system-ui, ..."
FONTS.body             "SF Pro Display, Inter, system-ui, ..."

FONT_SIZES.heroTitle   64
FONT_SIZES.sceneTitle  52
FONT_SIZES.subtitle    28
FONT_SIZES.body        20
FONT_SIZES.caption     16
FONT_SIZES.label       14

VIDEO.width            1080
VIDEO.height           1920
VIDEO.fps              30

SAFE_AREA.horizontal   60px
SAFE_AREA.vertical     120px

toFrames(seconds)      Convert seconds to frames
```

## Lottie Animations (@remotion/lottie)

Import and play Lottie JSON animations (exported from After Effects or downloaded from LottieFiles):

```tsx
import { Lottie, useLottie } from "@remotion/lottie";
import animationData from "./my-animation.json";

// Inside your component:
const { View } = useLottie({ animationData });
return <View style={{ width: 300, height: 300 }} />;
```

Or load dynamically:

```tsx
const [animationData, setAnimationData] = useState(null);
useEffect(() => {
  import("./my-animation.json").then(setAnimationData);
}, []);

if (!animationData) return null;
return <Lottie animationData={animationData} />;
```

- Frame sync is automatic via `useCurrentFrame()`
- Place `.json` Lottie files in `src/` or `public/`
- Thousands of free animations at https://lottiefiles.com/

## GSAP Timelines (@remotion/gsap)

Use GSAP timeline animations synced to Remotion's frame clock:

```tsx
import { useTimeline } from "@remotion/gsap";
import gsap from "gsap";

const MyScene: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);

  useTimeline(() => {
    const tl = gsap.timeline();
    tl.from(titleRef.current, { y: 50, opacity: 0, duration: 0.5 })
      .from(cardRef.current, { scale: 0, opacity: 0, duration: 0.3 }, "-=0.2")
      .to(titleRef.current, { color: "#00BCD4", duration: 0.3 });
    return tl;
  }, containerRef);

  return (
    <AbsoluteFill ref={containerRef}>
      <div ref={titleRef}>Hello</div>
      <div ref={cardRef}>Card</div>
    </AbsoluteFill>
  );
};
```

- GSAP timeline is seeked to the current frame — renders are deterministic
- Supports labels, staggers, nested timelines, SVG morphing
- Use GSAP duration in seconds (e.g., `duration: 0.5` = 15 frames at 30fps)
- GSAP docs: https://gsap.com/docs/v3/

## Earshot — Sound Effects Generation (CLI/MCP)

Earshot is an AI audio toolkit that runs locally on CPU. It's registered as an MCP server for this project.

### Quick CLI usage (from project root):

```bash
# List available built-in sound effects (252 sounds)
.earshot-venv/Scripts/python -m earshot sfx list

# Render a built-in sound effect by ID to WAV
.earshot-venv/Scripts/python -m earshot sfx render <id> public/audio/effect.wav

# Forge a custom sound from text description
.earshot-venv/Scripts/python -m earshot forge "short UI tap notification" -o public/audio/tap.wav

# Describe what a sound file sounds like
.earshot-venv/Scripts/python -m earshot describe public/audio/some-sound.wav
```

### Available CLI commands:
- `sfx list` — Browse 252 built-in SFX (clicks, hits, whooshes, risers, drops, etc.)
- `sfx render <id> <output.wav>` — Render a sound by ID to WAV
- `forge` — Synthesize custom SFX from text description
- `describe` — Analyze what a sound sounds like
- `match` — Score how well a sound matches a description
- `find` — Locate specific moments in audio
- `fit` — Convert a recording into a reproducible code recipe
- `kit` — Place SFX against picture cuts / music
- `mcp` — Run as MCP server (already configured for this project)

### Using generated audio in scenes:

```tsx
import { Audio, staticFile } from "remotion";

<Audio src={staticFile("audio/tap.wav")} volume={0.5} />
```

## Audio

Place audio files in `public/audio/`, then use in scenes:

```tsx
import { Audio, staticFile } from "remotion";

// Voiceover
<Audio src={staticFile("audio/scene1-vo.mp3")} />

// Sound effect with volume
<Audio src={staticFile("audio/click.mp3")} volume={0.5} />

// Fade-in volume
<Audio src={staticFile("audio/bgm.mp3")} volume={(f) => Math.min(1, f / 30) * 0.1} />
```

For global background music, edit the commented section in `src/Video.tsx`.

## Remotion Essentials

- `AbsoluteFill` — full-screen positioned container (use as root of every scene)
- `useCurrentFrame()` — current frame number (starts at 0 per scene)
- `useVideoConfig()` — `{ fps, width, height, durationInFrames }`
- `interpolate(frame, inputRange, outputRange, options)` — map frame to value
- `spring({ frame, fps, config })` — physics-based spring value
- `Easing.out(Easing.cubic)` — easing functions for interpolate
- `<Sequence from={30}>` — delay children by N frames
- `<Audio>` — play audio synced to video timeline
- `<Img src={staticFile("image.png")}>` — display static images
- `staticFile("filename")` — reference files in `public/`

## Scene Development Tips

- Each scene's `frame` starts at 0 (local to that scene)
- Use the SCENE config pattern for editable values:
  ```tsx
  const SCENE = { titleDelay: 10, cardStart: 25 };
  ```
- Preview individual scenes in Remotion Studio sidebar
- Use `interpolate` with `extrapolateLeft/Right: "clamp"` to prevent overshoot
