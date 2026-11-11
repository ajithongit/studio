export interface SceneConfig {
  /** Unique composition ID (appears in Remotion Studio sidebar and CLI render) */
  id: string;
  /** Human-readable title */
  title: string;
  /** Duration of this scene in seconds */
  durationInSeconds: number;
}
