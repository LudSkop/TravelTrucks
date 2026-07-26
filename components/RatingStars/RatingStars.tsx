import css from "./RatingStars.module.css";

type RatingStarsProps = {
  rating: number;
  maxStars?: number;
};

export default function RatingStars({
  rating,
  maxStars = 5,
}: RatingStarsProps) {
  return (
    <span
      className={css.stars}
      aria-label={`Rating: ${rating} out of ${maxStars}`}
    >
      {Array.from({ length: maxStars }).map((_, index) => {
        const fillPercent = Math.min(Math.max(rating - index, 0), 1) * 100;

        return (
          <span key={index} className={css.starWrapper}>
            <span className={css.starBase}>★</span>
            <span className={css.starFill} style={{ width: `${fillPercent}%` }}>
              ★
            </span>
          </span>
        );
      })}
    </span>
  );
}
