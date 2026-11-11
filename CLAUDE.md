# Remotion Studio — Agent Instructions

This is a zero-config Remotion video framework. Scenes are auto-discovered from `src/scenes/`.

## Quick Start

- `npm start` — Opens Remotion Studio in browser
- `npm run build` — Renders full video to `out/video.mp4`
- `npx remotion render <SceneId> out/scene.mp4` — Render a single scene

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
COLORS.bgPrimary       "#F9F9F7"   warm off-white
COLORS.bgSecondary     "#F0F4F8"   pale blue
COLORS.textPrimary     "#1B2A4A"   navy
COLORS.textSecondary   "#2D4470"   lighter navy
COLORS.accent          "#00BCD4"   cyan
COLORS.accentAlt       "#2196F3"   blue
COLORS.accentLight     "#E3F2FD"   light blue
COLORS.brand           "#F4845F"   orange
COLORS.cardBg          "#FFFFFF"
COLORS.cardBorder      "#E8EDF2"
COLORS.cardShadow      "rgba(27, 42, 74, 0.08)"
COLORS.white           "#FFFFFF"
COLORS.black           "#000000"

FONTS.heading          "Inter, system-ui, ..."
FONTS.body             "Inter, system-ui, ..."

FONT_SIZES.heroTitle   64
FONT_SIZES.sceneTitle  52
FONT_SIZES.subtitle    28
FONT_SIZES.body        20
FONT_SIZES.caption     16
FONT_SIZES.label       14

VIDEO.width            1920
VIDEO.height           1080
VIDEO.fps              30

SAFE_AREA.horizontal   120px
SAFE_AREA.vertical     60px

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
