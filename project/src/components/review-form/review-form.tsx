import React from 'react';
import { REVIEW_STARS } from '../../const/const';
import RatingStar from '../rating-star/rating-star';

const ReviewForm: React.FC = () => {
  const [data, setData] = React.useState({
    rating: '',
    review: '',
  });

  const handleChangeData = (
    evt: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setData({ ...data, [evt.target.name]: evt.target.value });
  };

  return (
    <form className="reviews__form form" action="#" method="post">
      <label className="reviews__label form__label" htmlFor="review">
        Your review
      </label>
      <div className="reviews__rating-form form__rating">
        {REVIEW_STARS.map((star) => (
          <RatingStar
            key={star.value}
            value={star.value}
            title={star.title}
            onChangeData={handleChangeData}
          />
        ))}
      </div>
      <textarea
        onChange={handleChangeData}
        className="reviews__textarea form__textarea"
        id="review"
        name="review"
        placeholder="Tell how was your stay, what you like and what can be improved"
        value={data.review}
      >
      </textarea>
      <div className="reviews__button-wrapper">
        <p className="reviews__help">
          To submit review please make sure to set{' '}
          <span className="reviews__star">rating</span> and describe your stay
          with at least <b className="reviews__text-amount">50 characters</b>.
        </p>
        <button
          className="reviews__submit form__submit button"
          type="submit"
          disabled
        >
          Submit
        </button>
      </div>
    </form>
  );
};

export default ReviewForm;
