import React from 'react';
import { Review } from '../../types/review';
import ReviewItem from '../review/review';

type ReviewListProps = {
  comments: Review[];
};

const ReviewList: React.FC<ReviewListProps> = ({ comments }) => (
  <ul className="reviews__list" data-testid="reviewList">
    {comments.map((comment) => (
      <ReviewItem key={comment.id} review={comment} />
    ))}
  </ul>
);

export default React.memo(ReviewList);
