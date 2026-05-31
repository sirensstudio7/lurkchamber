import { featuresExpandAbout } from "@/lib/content";
import "./features-expand-text.css";

export function FeaturesExpandText() {
  return (
    <div className="features-expand-text">
      {featuresExpandAbout.paragraphs.map((paragraph) => (
        <p
          key={paragraph}
          data-features-expand-item
          className="features-expand-text__paragraph"
        >
          {paragraph}
        </p>
      ))}
    </div>
  );
}
