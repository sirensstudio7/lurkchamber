"use client";

import { useId } from "react";
import "./circular-link.css";

type CircularLinkProps = {
  text: string;
  href?: string;
  title?: string;
  description?: string;
  variant?: "arrow" | "alt";
  className?: string;
};

const CIRCLE_PATH_ARROW =
  "M 20, 100 a 80,80 0 1,1 160,0 a 80,80 0 1,1 -160,0";
const CIRCLE_PATH_ALT =
  "M 35, 100 a 65,65 0 1,1 130,0 a 65,65 0 1,1 -130,0";
const ARROW_PATH = "M 75 100 L 125 100 L 110 85 M 125 100 L 110 115";
const RING_SEPARATOR = " • ";
const RING_REPEATS = 10;

/** Repeat a short label so it wraps the full circular textPath. */
function buildRingText(segment: string): string {
  const word = segment.trim();
  if (!word) return "";
  return Array.from({ length: RING_REPEATS }, () => word).join(RING_SEPARATOR) + RING_SEPARATOR;
}

const CLOUD_PATH =
  "M88.964,9.111C89.997,4.612 94.586,0.999 100,0.999C105.413,0.999 110.002,4.612 111.036,9.111C113.115,4.991 118.435,2.581 123.692,3.878C128.948,5.172 132.54,9.78 132.466,14.393C135.472,10.891 141.214,9.824 146.008,12.341C150.801,14.855 153.185,20.189 152.01,24.651C155.766,21.968 161.597,22.307 165.648,25.899C169.7,29.488 170.741,35.235 168.53,39.286C172.818,37.583 178.4,39.307 181.474,43.761C184.551,48.217 184.183,54.047 181.068,57.451C185.641,56.823 190.646,59.834 192.567,64.894C194.486,69.955 192.735,75.529 188.895,78.09C193.486,78.573 197.626,82.693 198.278,88.067C198.93,93.441 195.898,98.433 191.556,100C195.898,101.567 198.93,106.56 198.278,111.934C197.626,117.307 193.486,121.427 188.895,121.91C192.735,124.472 194.486,130.045 192.567,135.106C190.646,140.167 185.641,143.177 181.068,142.549C184.183,145.954 184.551,151.783 181.474,156.239C178.4,160.693 172.818,162.418 168.53,160.712C170.741,164.766 169.7,170.512 165.648,174.102C161.597,177.691 155.766,178.032 152.01,175.349C153.185,179.812 150.801,185.145 146.008,187.66C141.214,190.176 135.472,189.109 132.466,185.607C132.54,190.221 128.948,194.828 123.692,196.123C118.435,197.419 113.115,195.009 111.036,190.889C110.002,195.388 105.413,199.001 100,199.001C94.586,199.001 89.997,195.388 88.964,190.889C86.884,195.009 81.564,197.419 76.307,196.123C71.051,194.828 67.461,190.221 67.533,185.607C64.529,189.109 58.785,190.176 53.992,187.66C49.2,185.145 46.815,179.812 47.989,175.349C44.233,178.032 38.402,177.691 34.351,174.102C30.299,170.512 29.259,164.766 31.469,160.712C27.181,162.418 21.599,160.693 18.525,156.239C15.449,151.783 15.816,145.954 18.931,142.549C14.359,143.177 9.353,140.167 7.434,135.106C5.513,130.045 7.264,124.472 11.104,121.91C6.514,121.427 2.374,117.307 1.722,111.934C1.07,106.56 4.103,101.567 8.443,100C4.103,98.433 1.07,93.441 1.722,88.067C2.374,82.693 6.514,78.573 11.104,78.09C7.264,75.529 5.513,69.955 7.434,64.894C9.353,59.834 14.359,56.823 18.931,57.451C15.816,54.047 15.449,48.217 18.525,43.761C21.599,39.307 27.181,37.583 31.469,39.286C29.259,35.235 30.299,29.488 34.351,25.899C38.402,22.307 44.233,21.968 47.989,24.651C46.815,20.189 49.2,14.855 53.992,12.341C58.785,9.824 64.529,10.891 67.533,14.393C67.461,9.78 71.051,5.172 76.307,3.878C81.564,2.581 86.884,4.991 88.964,9.111Z";

export function CircularLink({
  text,
  href = "#contact",
  title = "Contact us",
  description = "Rotating link with text around a circle and an arrow inside",
  variant = "arrow",
  className = "",
}: CircularLinkProps) {
  const uid = useId().replace(/:/g, "");
  const circleId = `circular-link-circle-${uid}`;
  const titleId = `circular-link-title-${uid}`;
  const descId = `circular-link-desc-${uid}`;
  const isAlt = variant === "alt";

  return (
    <a
      href={href}
      className={`circular-link ${isAlt ? "circular-link--alt" : ""} ${className}`.trim()}
    >
      <svg
        viewBox="0 0 200 200"
        width="200"
        height="200"
        xmlns="http://www.w3.org/2000/svg"
        className="circular-link__svg"
        aria-labelledby={titleId}
        aria-describedby={descId}
      >
        <title id={titleId}>{title}</title>
        <desc id={descId}>{description}</desc>

        <path
          id={circleId}
          className="circular-link__path"
          d={isAlt ? CIRCLE_PATH_ALT : CIRCLE_PATH_ARROW}
          stroke="none"
          fill="none"
        />

        {isAlt ? (
          <>
            <path className="circular-link__cloud" d={CLOUD_PATH} fill="none" />
            <g className="circular-link__face">
              <path d="M 95 102 Q 100 107 105 102" fill="none" />
              <ellipse cx="90" cy="100" rx="2" ry="2" stroke="none" />
              <ellipse cx="110" cy="100" rx="2" ry="2" stroke="none" />
              <ellipse cx="100" cy="100" rx="35" ry="35" fill="none" />
            </g>
          </>
        ) : (
          <path className="circular-link__arrow" d={ARROW_PATH} fill="none" />
        )}

        <text className="circular-link__text">
          <textPath href={`#${circleId}`} stroke="none" startOffset="0%">
            {buildRingText(text)}
          </textPath>
        </text>
      </svg>
    </a>
  );
}
