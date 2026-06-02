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
    <div
      className="work-highlight-frame relative aspect-[16/10] w-full overflow-hidden rounded-3xl bg-white ring-1 ring-inset ring-foreground/10"
    >
      {showImage ? (
        <Image
          src={src!}
          alt={alt}
          fill
          sizes="(max-width: 767px) 85vw, 50vw"
          className="object-cover object-top"
          onError={() => setImageFailed(true)}
        />
      ) : null}
    </div>
  );
}
