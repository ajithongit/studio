# Audio Integration

## File Locations

Place audio files in `public/audio/`. Reference them with `staticFile("audio/filename.mp3")`.

## Per-Scene Audio

```tsx
import { Audio, staticFile } from "remotion";

// Inside your scene's return:
<Audio src={staticFile("audio/scene1-voiceover.mp3")} />
```

## Background Music

Edit `src/Video.tsx` — uncomment the Audio line to add global background music.

## Volume Control

```tsx
// Fixed volume
<Audio src={staticFile("audio/sfx.mp3")} volume={0.5} />

// Fade in over 30 frames
<Audio src={staticFile("audio/bgm.mp3")} volume={(f) => Math.min(1, f / 30) * 0.1} />
```

## Supported Formats

MP3, WAV, AAC, OGG
