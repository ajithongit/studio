# Remotion Studio

Zero-config video framework with auto-discovered scenes, TradingView-style charts, Three.js 3D, beat-synced animations, and AI sound effects.

## Setup

```bash
git clone <repo-url>
cd studio
npm run setup
```

This single command installs everything:
- **Node packages** — Remotion, Three.js, react-three-fiber, rapier, postprocessing, GSAP, Lottie
- **Python venv** — Earshot (AI sound effects) + librosa (beat detection)
- **video-shotcraft** — 124 motion recipe references in `.vendor/`

## Run

```bash
npm start              # Open Remotion Studio in browser
npm run build          # Render full video → out/video.mp4
npx remotion render <SceneId> out/scene.mp4   # Render single scene
```

## Create a Scene

Drop a file in `src/scenes/` named `NNN_SceneName.tsx`:

```tsx
import React from "react";
import { AbsoluteFill, useCurrentFrame } from "remotion";
import { COLORS } from "../design/tokens";
import type { SceneConfig } from "./types";

export const config: SceneConfig = {
  id: "MyScene",
  title: "My Scene",
  durationInSeconds: 5,
};

const MyScene: React.FC = () => {
  const frame = useCurrentFrame();
  return (
    <AbsoluteFill style={{ backgroundColor: COLORS.bgPrimary }}>
      {/* Your content */}
    </AbsoluteFill>
  );
};

export default MyScene;
```

Save. It auto-appears in Remotion Studio. No other files need editing.

## Toolkit

| Feature | Import / Command | What It Does |
|---|---|---|
| **TradingView Charts** | `import { TradingChart } from "../design/components"` | Animated candlestick charts with MA lines, volume, forecast cones |
| **Three.js 3D** | `import { ThreeCanvas } from "@remotion/three"` | Full 3D scenes — PBR materials, lighting, geometry |
| **Animations** | `import { fadeIn, slideIn, scalePop } from "../design/animations"` | Frame-based animation helpers |
| **Components** | `import { Card, Headline, PhoneMockup } from "../design/components"` | Pre-built animated UI components |
| **Beat Detection** | `npm run beat-detect -- audio.mp3 --out src/beats.ts` | Librosa beat analysis → TypeScript keyframe data |
| **Sound Effects** | `.earshot-venv/Scripts/python -m earshot forge "description" -o out.wav` | AI-generated SFX from text |
| **Lottie** | `import { Lottie } from "@remotion/lottie"` | After Effects JSON animations |
| **GSAP** | `import { useTimeline } from "@remotion/gsap"` | Timeline-based animations synced to frames |
| **Motion Recipes** | `.vendor/video-shotcraft/references/shots/` | 124 shot composition references |

## Project Structure

```
src/
  scenes/          Auto-discovered scene files (NNN_Name.tsx)
  design/
    tokens.ts      Colors, fonts, sizes, video config
    animations.ts  fadeIn, slideIn, scalePop, spring presets
    components/    Card, Headline, TradingChart, PhoneMockup, etc.
scripts/
  setup.sh         One-time setup (node + python + vendor)
  beat-detect.py   Audio beat detection → TypeScript
public/
  audio/           Voiceovers, SFX, music
```

See `CLAUDE.md` for full API reference.
