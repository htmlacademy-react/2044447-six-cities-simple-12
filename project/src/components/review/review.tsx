import React from 'react';
import { Review } from '../../types/review';
import { getRatingColor, humanizeDate } from '../../utils/utils';

type ReviewItemProps = {
  review: Review;
};

const ReviewItem: React.FC<ReviewItemProps> = ({ review }) => {
  const { comment, date, rating, user } = review;
  const { avatarUrl, isPro, name } = user;

  return (
    <li className="reviews__item" data-testid="reviewItem">
      <div className="reviews__user user">
        <div className="reviews__avatar-wrapper user__avatar-wrapper">
          <img
            className="reviews__avatar user__avatar"
            src={avatarUrl}
            width="54"
            height="54"
            alt="Reviews avatar"
          />
          <span className="property__user-status">{isPro}</span>
        </div>
        <span className="reviews__user-name">{name}</span>
      </div>
      <div className="reviews__info">
        <div className="reviews__rating rating">
          <div className="reviews__stars rating__stars">
            <span style={{ width: `${getRatingColor(rating)}%` }}></span>
            <span className="visually-hidden">Rating</span>
          </div>
        </div>
        <p className="reviews__text">{comment}</p>
        <time
          className="reviews__time"
          dateTime={humanizeDate(date, 'YYYY-MM-DD')}
        >
          {humanizeDate(date, 'MMMM YYYY')}
        </time>
      </div>
    </li>
  );
};

export default React.memo(ReviewItem);
