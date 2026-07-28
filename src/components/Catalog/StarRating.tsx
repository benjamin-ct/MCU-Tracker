import {useState} from 'react';

import styles from './StarRating.module.css';

interface StarRatingProps {
  rating: number;
  containerClassName: string;
  onRate: (value: number) => void;
}

const STAR_VALUES = [1, 2, 3, 4, 5];

export function StarRating({rating, containerClassName, onRate}: StarRatingProps) {
  const [hoverRating, setHoverRating] = useState(0);

  return (
    <div className={containerClassName}>
      {STAR_VALUES.map((value) => (
        <span
          key={value}
          className={value <= (hoverRating || rating) ? `${styles.star} ${styles.lit}` : styles.star}
          onClick={() => onRate(value)}
          onMouseEnter={() => setHoverRating(value)}
          onMouseLeave={() => setHoverRating(0)}
        >
          ★
        </span>
      ))}
    </div>
  );
}
