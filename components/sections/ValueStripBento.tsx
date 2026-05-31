import type { CSSProperties } from "react";
import { valueStripBento } from "@/lib/content";
import "./value-strip-bento.css";

const BENTO_YELLOW = "#ffca26";

const gridAreaStyle = (area: string): CSSProperties =>
  ({ "--grid-area": area }) as CSSProperties;

const swatchStyle = (): CSSProperties =>
  ({ "--swatch-color": BENTO_YELLOW }) as CSSProperties;

export function ValueStripBento() {
  const tiles = valueStripBento.filter((item) => item.gridArea !== "banner");
  const banner = valueStripBento.find((item) => item.gridArea === "banner");

  return (
    <div className="value-strip-bento mt-8 md:mt-10">
      {tiles.map((item) => (
        <a
          key={item.gridArea}
          href={item.href}
          data-value-media
          className="opacity-0"
          style={gridAreaStyle(item.gridArea)}
        >
          <p
            className={[
              "value-strip-bento__label value-strip-bento__label--dark",
              "align" in item && item.align === "right"
                ? "value-strip-bento__label--right"
                : "",
            ]
              .filter(Boolean)
              .join(" ")}
          >
            {item.label}
          </p>
          <div
            className="value-strip-bento__swatch"
            style={swatchStyle()}
            aria-hidden
          />
        </a>
      ))}

      {banner ? (
        <a
          href={banner.href}
          data-value-media
          className="value-strip-bento__banner opacity-0"
          style={gridAreaStyle(banner.gridArea)}
          aria-label="Contact"
        />
      ) : null}
    </div>
  );
}
