import React from 'react';
import { getRatingColor } from '../../utils/utils';
import Badge from '../badge/badge';
import { Offer } from '../../types/offer';
import ImagePlace from '../image-place/image-place';
import { generatePath, Link } from 'react-router-dom';
import { AppRoute } from '../../const/const';

type CardProps = {
  offer: Offer;
  onCardHover?: (id: number | null) => void;
  cardType: 'home' | 'property';
};

const cardClassnames = {
  home: {
    article: 'cities__card place-card',
    image: 'cities__image-wrapper place-card__image-wrapper',
    cardInfo: 'place-card__info',
  },

  property: {
    article: 'near-places__card place-card',
    image: 'near-places__image-wrapper place-card__image-wrapper',
    cardInfo: 'place-card__info',
  },
};

const Card: React.FC<CardProps> = ({ offer, onCardHover, cardType }) => {
  const { price, previewImage, title, type, isPremium, rating, id } = offer;

  const link = generatePath(AppRoute.Property, {
    id: `${id}`,
  });

  const { article, image, cardInfo } = cardClassnames[cardType];
  const typePlace = type.replace(type[0], type[0].toUpperCase());

  return (
    <article
      className={article}
      onMouseOver={() => onCardHover?.(id)}
      onMouseLeave={() => onCardHover?.(null)}
      data-testid="offerItem"
    >
      {isPremium && <Badge className="place-card__mark" />}
      <div className={image}>
        <ImagePlace
          previewImage={previewImage}
          title={title}
          type={cardType}
          id={id}
        />
      </div>
      <div className={cardInfo}>
        <div className="place-card__price-wrapper">
          <div className="place-card__price">
            <b className="place-card__price-value">&euro;{price}</b>
            <span className="place-card__price-text">&#47;&nbsp;night</span>
          </div>
        </div>
        <div className="place-card__rating rating">
          <div className="place-card__stars rating__stars">
            <span style={{ width: `${getRatingColor(rating)}%` }}></span>
            <span className="visually-hidden">Rating</span>
          </div>
        </div>
        <h2 className="place-card__name">
          <Link to={link}>{title}</Link>
        </h2>
        <p className="place-card__type">{typePlace}</p>
      </div>
    </article>
  );
};

export default Card;
