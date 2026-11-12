/** Animation utilities — smooth, premium motion */

import { interpolate, spring, Easing } from "remotion";
import { VIDEO } from "./tokens";

const FPS = VIDEO.fps;

// --- Spring presets ---
export const SPRING_CONFIG = {
  gentle: { damping: 20, stiffness: 100, mass: 0.8 },
  snappy: { damping: 15, stiffness: 200, mass: 0.6 },
  soft: { damping: 30, stiffness: 80, mass: 1 },
  bounce: { damping: 10, stiffness: 150, mass: 0.5 },
};

// --- Core animations ---

export const fadeIn = (
  frame: number,
  delay = 0,
  duration = 20
): number =>
  interpolate(frame - delay, [0, duration], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.out(Easing.cubic),
  });

export const fadeOut = (
  frame: number,
  startFrame: number,
  duration = 15
): number =>
  interpolate(frame - startFrame, [0, duration], [1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.in(Easing.cubic),
  });

export const slideIn = (
  frame: number,
  direction: "up" | "down" | "left" | "right" = "up",
  delay = 0,
  distance = 60,
  duration = 25
): { transform: string; opacity: number } => {
  const progress = interpolate(frame - delay, [0, duration], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.out(Easing.cubic),
  });

  const offset = (1 - progress) * distance;
  const dirs: Record<string, string> = {
    up: `translateY(${offset}px)`,
    down: `translateY(${-offset}px)`,
    left: `translateX(${offset}px)`,
    right: `translateX(${-offset}px)`,
  };

  return {
    transform: dirs[direction],
    opacity: progress,
  };
};

export const scalePop = (
  frame: number,
  fps: number,
  delay = 0,
  config = SPRING_CONFIG.bounce
): { transform: string; opacity: number } => {
  const spr = spring({
    frame: frame - delay,
    fps,
    config,
  });

  return {
    transform: `scale(${spr})`,
    opacity: Math.min(1, spr * 2),
  };
};

export const maskReveal = (
  frame: number,
  delay = 0,
  duration = 25
): { clipPath: string } => {
  const progress = interpolate(frame - delay, [0, duration], [0, 100], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.out(Easing.cubic),
  });

  return { clipPath: `inset(0 ${100 - progress}% 0 0)` };
};

export const gentleFloat = (
  frame: number,
  fps: number,
  amplitude = 6
): { transform: string } => {
  const y = Math.sin((frame / fps) * Math.PI * 0.5) * amplitude;
  return { transform: `translateY(${y}px)` };
};

export const gentleTilt = (
  frame: number,
  delay = 0,
  maxDegrees = 3,
  duration = 30
): { transform: string } => {
  const progress = interpolate(frame - delay, [0, duration], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const deg = Math.sin(progress * Math.PI * 2) * maxDegrees;
  return { transform: `rotate(${deg}deg)` };
};

export const staggerDelay = (index: number, baseDelay = 8): number =>
  index * baseDelay;

// --- Line draw animation ---
export const drawLine = (
  frame: number,
  delay = 0,
  duration = 60
): number =>
  interpolate(frame - delay, [0, duration], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.out(Easing.quad),
  });

// --- Counter animation ---
export const animateNumber = (
  frame: number,
  target: number,
  delay = 0,
  duration = 30
): number => {
  const progress = interpolate(frame - delay, [0, duration], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.out(Easing.cubic),
  });
  return target * progress;
};
