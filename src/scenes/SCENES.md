# Scenes — Quick Start

## Creating a Scene

1. Create `NNN_SceneName.tsx` in this folder (e.g., `002_Intro.tsx`)
2. Export `config` + `default` component
3. Save. It auto-appears in Remotion Studio.

**DO NOT edit** `index.ts`, `types.ts`, `Root.tsx`, or `Video.tsx`.

## Naming Rules

- `NNN` = three-digit order (001, 002, 003...)
- `SceneName` = PascalCase, no spaces
- Files starting with `_` are ignored
- Gaps in numbering are fine (001, 003, 005)

## Required Exports

```tsx
import React from "react";
import { AbsoluteFill, useCurrentFrame, useVideoConfig } from "remotion";
import { COLORS } from "../design/tokens";
import type { SceneConfig } from "./types";

export const config: SceneConfig = {
  id: "UniqueSceneId",
  title: "Human Readable Title",
  durationInSeconds: 5,
};

const MyScene: React.FC = () => {
  const frame = useCurrentFrame();
  return (
    <AbsoluteFill style={{ backgroundColor: COLORS.bgPrimary }}>
      {/* Scene content */}
    </AbsoluteFill>
  );
};

export default MyScene;
```

## Copy-Paste Starter

Copy `_Template.tsx` → `NNN_YourScene.tsx` and edit.

## Available Tools

### TradingView Charts
```tsx
import { TradingChart } from "../design/components";

<TradingChart
  direction="bullish"    // "bearish" | "bullish"
  width={980} height={520}
  seed={42}              // deterministic candle data
  candleCount={45}
  delay={2}              // animation delay in frames
  showForecast showVolume showMA showGrid showPriceAxis
/>
```

### Three.js 3D Scenes
```tsx
import { ThreeCanvas } from "@remotion/three";
import * as THREE from "three";

<ThreeCanvas width={1080} height={1920} camera={{ position: [0, 2, 10], fov: 50 }}>
  <ambientLight intensity={0.4} />
  <mesh rotation={[0, frame / fps, 0]}>
    <torusKnotGeometry args={[1, 0.3, 128, 32]} />
    <meshStandardMaterial color="#00BCD4" metalness={0.8} />
  </mesh>
</ThreeCanvas>
```

Use procedural math (interpolate, spring, gravity formulas) for animations — NOT Rapier physics — so frames are seekable.

### Animations
```tsx
import { fadeIn, slideIn, scalePop, staggerDelay } from "../design/animations";
```

### Components
```tsx
import { Card, Headline, PhoneMockup, GlassCard, MarketLine, TradingChart } from "../design/components";
```

### Beat-Synced Animations
```bash
npm run beat-detect -- public/audio/file.mp3 --out src/beats.ts
```
Import the generated `BEAT_DATA.beatFrames` array to sync animations to music.

### Sound Effects (Earshot)
```bash
.earshot-venv/Scripts/python -m earshot forge "description" -o public/audio/file.wav
.earshot-venv/Scripts/python -m earshot sfx list       # browse 252 built-in SFX
.earshot-venv/Scripts/python -m earshot sfx render <id> public/audio/file.wav
```

### Lottie Animations
```tsx
import { Lottie } from "@remotion/lottie";
```

### GSAP Timelines
```tsx
import { useTimeline } from "@remotion/gsap";
```

### Motion Recipes (reference)
124 shot patterns in `.vendor/video-shotcraft/references/shots/` — use as composition reference.

## Setup

If tools are missing, run `npm run setup` from the project root.

## See Also

- `CLAUDE.md` in project root for full API reference
- `README.md` for project overview
