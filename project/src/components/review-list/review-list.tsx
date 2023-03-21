import React from 'react';
import { reviews } from '../../mocks/reviews';
import ReviewItem from '../review/review';

const ReviewList: React.FC = () => (
  <ul className="reviews__list">
    {reviews.map((review) => (
      <ReviewItem key={review.user.name} review={review} />
    ))}
  </ul>
);

export default ReviewList;
