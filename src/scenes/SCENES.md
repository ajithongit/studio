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

## Extra Tools Available

- **Lottie**: `import { Lottie, useLottie } from "@remotion/lottie"` — play After Effects JSON animations
- **GSAP**: `import { useTimeline } from "@remotion/gsap"` — timeline-based animations synced to frames
- **Earshot**: CLI/MCP for generating SFX — `.earshot-venv/Scripts/python -m earshot forge "description" -o public/audio/file.wav`
- **Remotion Agent Skills**: 13 skills installed in `.agents/skills/` for best practices

## See Also

- `CLAUDE.md` in project root for full API reference (animations, components, tokens, Lottie, GSAP, Earshot)
