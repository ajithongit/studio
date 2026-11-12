/** Design tokens — Apple-inspired premium financial aesthetic */

export const COLORS = {
  bgPrimary: "#F8F9FB",
  bgSecondary: "#F1F3F6",
  textPrimary: "#17191F",
  textSecondary: "#777D87",
  accent: "#00BCD4",
  accentAlt: "#2196F3",
  accentLight: "#E3F2FD",
  brand: "#F4845F",
  cardBg: "#FFFFFF",
  cardBorder: "#E8EDF2",
  cardShadow: "rgba(27, 42, 74, 0.08)",
  white: "#FFFFFF",
  black: "#000000",

  // Financial-specific
  positive: "#34A853",
  positiveLight: "#E6F4EA",
  negative: "#E05A47",
  negativeLight: "#FDE8E4",
  gold: "#C9A84C",
  goldLight: "#F9F3E3",

  // ICICI brand
  iciciBrand: "#ED1C24",
  iciciBrandDark: "#B91C1C",

  // Glassmorphism
  glassBg: "rgba(255, 255, 255, 0.65)",
  glassBorder: "rgba(255, 255, 255, 0.35)",
  glassShadow: "rgba(0, 0, 0, 0.04)",
};

export const FONTS = {
  heading: "'SF Pro Display', 'Inter', 'Helvetica Neue', system-ui, sans-serif",
  body: "'SF Pro Display', 'Inter', 'Helvetica Neue', system-ui, sans-serif",
};

export const FONT_SIZES = {
  heroTitle: 64,
  sceneTitle: 52,
  subtitle: 28,
  body: 20,
  caption: 16,
  label: 14,
};

export const VIDEO = {
  width: 1080,
  height: 1920,
  fps: 30,
};

export const SAFE_AREA = {
  horizontal: "60px",
  vertical: "120px",
};

export const toFrames = (seconds: number): number =>
  Math.round(seconds * VIDEO.fps);
