export type AspectRatio = "1:1" | "3:4" | "4:3" | "9:16" | "16:9";

export interface GeneratedImage {
  url: string;
  prompt: string;
  timestamp: number;
}

export interface GenerationError {
  message: string;
}
