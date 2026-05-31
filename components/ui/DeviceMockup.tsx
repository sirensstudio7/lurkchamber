"use client";

import { FeatureCardModel } from "@/components/ui/FeatureCardModel";

const EYE_MODEL = "/models/anatomical_eye_ball.glb";

const MODEL_HEIGHT =
  "h-[min(40dvh,300px)] min-h-[260px] sm:h-[280px] md:h-[340px] md:min-h-0";

export function DeviceMockup() {
  return (
    <div
      className="relative z-10 min-h-[260px] w-full overflow-visible md:-mt-8 md:min-h-0"
      aria-label="Anatomical eye 3D model"
    >
      <FeatureCardModel
        src={EYE_MODEL}
        motion="watch"
        cameraRadius="265%"
        alt="Anatomical eye"
        className={`mx-auto block w-full ${MODEL_HEIGHT}`}
      />
    </div>
  );
}
