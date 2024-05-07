import { SyntheticEvent } from "react";

export type VideoProcess =
  | "video-reset"
  | "video-last"
  | "video-end"
  | "play"
  | "pause";

export type LoadedData = { event: SyntheticEvent }[];
