/**
 * SCENE TEMPLATE — Copy this file to create a new scene.
 *
 * 1. Copy this file as NNN_YourSceneName.tsx (e.g., 002_Intro.tsx)
 * 2. Update the config object below
 * 3. Build your scene visuals
 * 4. Save — Remotion Studio picks it up automatically!
 *
 * This file is NOT included in the video (starts with _).
 */

import React from "react";
import {
  AbsoluteFill,
  useCurrentFrame,
  useVideoConfig,
  interpolate,
  spring,
  Easing,
  Audio,
  staticFile,
} from "remotion";
import { Lottie, useLottie } from "@remotion/lottie";
import { useTimeline } from "@remotion/gsap";
import { COLORS, FONTS, FONT_SIZES, SAFE_AREA } from "../design/tokens";
import { fadeIn, slideIn, scalePop, maskReveal, SPRING_CONFIG } from "../design/animations";
import { Headline, Card } from "../design/components";
import type { SceneConfig } from "./types";

export const config: SceneConfig = {
  id: "CHANGE-ME",
  title: "Scene Title",
  durationInSeconds: 5,
};

const MyScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  return (
    <AbsoluteFill
      style={{
        backgroundColor: COLORS.bgPrimary,
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        padding: SAFE_AREA.horizontal,
      }}
    >
      <Headline text="Scene Title" delay={5} />

      <div
        style={{
          ...slideIn(frame, "up", 15),
          fontFamily: FONTS.body,
          fontSize: FONT_SIZES.subtitle,
          color: COLORS.textSecondary,
          marginTop: 20,
          textAlign: "center",
        }}
      >
        Your content here
      </div>
    </AbsoluteFill>
  );
};

export default MyScene;
