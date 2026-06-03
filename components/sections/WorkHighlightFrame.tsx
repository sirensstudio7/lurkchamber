"use client";

import Image from "next/image";
import { useState } from "react";

type WorkHighlightFrameProps = {
  src?: string;
  alt: string;
};

export function WorkHighlightFrame({ src, alt }: WorkHighlightFrameProps) {
  const [imageFailed, setImageFailed] = useState(false);
  const showImage = Boolean(src) && !imageFailed;

  return (
    <div className="work-highlight-frame relative aspect-[16/10] w-full overflow-hidden rounded-[1.25rem] bg-white shadow-[inset_0_0_0_1px_rgba(10,10,10,0.1)]">
      {showImage ? (
        <Image
          src={src!}
          alt={alt}
          fill
          sizes="(max-width: 767px) 85vw, 50vw"
          className="rounded-[inherit] object-cover object-center"
          onError={() => setImageFailed(true)}
        />
      ) : null}
    </div>
  );
}
