# Audio Integration

## Setup

Audio tools are installed via `npm run setup` (from project root). This sets up:
- **Earshot** — AI sound effects generator (252 built-in SFX + custom forge)
- **librosa** — Beat detection for animation sync

## File Locations

Place audio files in `public/audio/`. Reference them with `staticFile("audio/filename.mp3")`.

## Per-Scene Audio

```tsx
import { Audio, staticFile } from "remotion";

// Inside your scene's return:
<Audio src={staticFile("audio/scene1-voiceover.mp3")} />
```

## Volume Control

```tsx
// Fixed volume
<Audio src={staticFile("audio/sfx.mp3")} volume={0.5} />

// Fade in over 30 frames
<Audio src={staticFile("audio/bgm.mp3")} volume={(f) => Math.min(1, f / 30) * 0.1} />
```

## Background Music

Edit `src/Video.tsx` — uncomment the Audio line to add global background music.

## Generate Sound Effects (Earshot)

```bash
# Browse 252 built-in SFX
.earshot-venv/Scripts/python -m earshot sfx list

# Render a built-in SFX
.earshot-venv/Scripts/python -m earshot sfx render <id> public/audio/effect.wav

# Forge custom SFX from text description
.earshot-venv/Scripts/python -m earshot forge "short UI tap notification" -o public/audio/tap.wav

# Describe what a sound file sounds like
.earshot-venv/Scripts/python -m earshot describe public/audio/some-sound.wav
```

## Beat Detection (librosa)

Analyze audio to get beat frame numbers for syncing animations:

```bash
# Print beat data to stdout
npm run beat-detect -- public/audio/voiceover.mp3

# Write to TypeScript file
npm run beat-detect -- public/audio/voiceover.mp3 --fps 30 --out src/beats.ts
```

Output:
```ts
export const BEAT_DATA = {
  tempo: 143.6,
  durationFrames: 851,
  beatFrames: [68, 82, 95, ...],
} as const;
```

Import `beatFrames` in your scene to trigger animations on each beat.

## Supported Formats

MP3, WAV, AAC, OGG
