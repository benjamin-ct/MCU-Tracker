// Ported from starsHTML()/refreshStars() (legacy js/render.js) + the document-level
// click delegation in js/state.js. Visibility (height 0 -> 27px/41px on watched) is
// entirely CSS-driven by the ancestor .row.done/.sg.sg-done class — this component
// just renders the 5 stars, the parent row/series component owns that ancestor class.
interface StarRatingProps {
  rating: number;
  variant: 'stars' | 'sg-stars';
  onRate: (value: number) => void;
}

const STAR_VALUES = [1, 2, 3, 4, 5];

export function StarRating({ rating, variant, onRate }: StarRatingProps) {
  return (
    <div className={variant}>
      {STAR_VALUES.map((value) => (
        <span
          key={value}
          className={value <= rating ? 'star lit' : 'star'}
          onClick={() => onRate(value)}
        >
          ★
        </span>
      ))}
    </div>
  );
}
