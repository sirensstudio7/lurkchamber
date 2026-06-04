import Image from "next/image";
import "./client-reviews.css";

type ClientReviewCardProps = {
  tags: readonly string[];
  titleLine1: string;
  titleLine2: string;
  quote: string;
  clientName: string;
  role: string;
  image: string;
  featured?: boolean;
};

function CardMarkIcon() {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 18 18"
      fill="none"
      aria-hidden
    >
      <path
        d="M4.5 7.5 9 12l4.5-4.5"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function ClientReviewCard({
  tags,
  titleLine1,
  titleLine2,
  quote,
  clientName,
  role,
  image,
  featured = false,
}: ClientReviewCardProps) {
  return (
    <article
      className={`client-review-card ${featured ? "client-review-card--featured" : ""}`}
    >
      <div className="client-review-card__content">
        <div className="client-review-card__top">
          <div className="client-review-card__tags">
            {tags.map((tag) => (
              <span key={tag} className="client-review-card__tag">
                {tag}
              </span>
            ))}
          </div>
          <span className="client-review-card__mark" aria-hidden>
            <CardMarkIcon />
          </span>
        </div>

        <h3 className="client-review-card__title">
          <span className="client-review-card__title-line">{titleLine1}</span>
          <span className="client-review-card__title-line">{titleLine2}</span>
        </h3>
        <p className="client-review-card__quote">&ldquo;{quote}&rdquo;</p>
        <p className="client-review-card__client">
          <span>{clientName}</span>
          <span>{role}</span>
        </p>
      </div>

      <div className="client-review-card__media">
        <Image
          src={image}
          alt=""
          fill
          sizes="(max-width: 767px) calc(100vw - 3rem), 340px"
          className="client-review-card__image"
        />
        <div className="client-review-card__media-overlay" aria-hidden />
      </div>
    </article>
  );
}
