import type { DetailedHTMLProps, HTMLAttributes } from "react";

type ModelViewerAttributes = HTMLAttributes<HTMLElement> & {
  src?: string;
  alt?: string;
  poster?: string;
  exposure?: string;
  loading?: "auto" | "lazy" | "eager";
  reveal?: "auto" | "interaction" | "manual";
  "auto-rotate"?: boolean;
  "camera-controls"?: boolean;
  "disable-zoom"?: boolean;
  "disable-pan"?: boolean;
  "camera-orbit"?: string;
  "min-camera-orbit"?: string;
  "max-camera-orbit"?: string;
  "field-of-view"?: string;
  "overflow-visible"?: boolean;
  "shadow-intensity"?: string;
  "environment-image"?: string;
  "interaction-prompt"?: string;
  orientation?: string;
};

declare module "react" {
  namespace JSX {
    interface IntrinsicElements {
      "model-viewer": DetailedHTMLProps<ModelViewerAttributes, HTMLElement>;
    }
  }
}
