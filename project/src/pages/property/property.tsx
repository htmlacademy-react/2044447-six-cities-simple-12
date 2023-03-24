import React from 'react';
import { useParams } from 'react-router-dom';
import Badge from '../../components/badge/badge';
import Layout from '../../components/layout/layout';
import ListOffers from '../../components/list-offers/list-offers';
import Map from '../../components/map/map';
import PropertyImage from '../../components/property-image/property-image';
import PropertyItem from '../../components/property-item/property-item';
import ReviewForm from '../../components/review-form/review-form';
import ReviewList from '../../components/review-list/review-list';
import { COUNT_NEAR_OFFER } from '../../const/const';
import { useAppSelector } from '../../hooks';
import { reviews } from '../../mocks/reviews';
import { Offer } from '../../types/offer';
import { getRatingColor } from '../../utils/utils';

const Property: React.FC = () => {
  const { id } = useParams();
  const [room, setRoom] = React.useState<Offer>();
  const offers = useAppSelector((state) => state.offers);

  React.useEffect(() => {
    setRoom(offers.find((offer) => offer.id === Number(id)));
  }, []);

  if (!room) {
    return <>Загрузка...</>;
  }
  const cityLocation = room.city;
  const {
    images,
    isPremium,
    title,
    rating,
    type,
    bedrooms,
    maxAdults,
    price,
    goods,
    host,
  } = room;

  const { avatarUrl, name, isPro } = host;

  const nearOffers = [...offers.slice(0, COUNT_NEAR_OFFER), room];

  return (
    <Layout pageTitle="Property">
      <main className="page__main page__main--property">
        <section className="property">
          <div className="property__gallery-container container">
            <div className="property__gallery">
              {images.map((img) => (
                <PropertyImage key={img} img={img} />
              ))}
            </div>
          </div>
          <div className="property__container container">
            <div className="property__wrapper">
              {isPremium && <Badge className="property__mark" />}
              <div className="property__name-wrapper">
                <h1 className="property__name">{title}</h1>
              </div>
              <div className="property__rating rating">
                <div className="property__stars rating__stars">
                  <span style={{ width: `${getRatingColor(rating)}%` }}></span>
                  <span className="visually-hidden">Rating</span>
                </div>
                <span className="property__rating-value rating__value">
                  {rating}
                </span>
              </div>
              <ul className="property__features">
                <li className="property__feature property__feature--entire">
                  {type.replace(type[0], type[0].toUpperCase())}
                </li>
                <li className="property__feature property__feature--bedrooms">
                  {bedrooms} Bedrooms
                </li>
                <li className="property__feature property__feature--adults">
                  Max {maxAdults} adults
                </li>
              </ul>
              <div className="property__price">
                <b className="property__price-value">&euro;{price}</b>
                <span className="property__price-text">&nbsp;night</span>
              </div>
              <div className="property__inside">
                <h2 className="property__inside-title">What&apos;s inside</h2>
                <ul className="property__inside-list">
                  {goods.map((item) => (
                    <PropertyItem key={item} item={item} />
                  ))}
                </ul>
              </div>
              <div className="property__host">
                <h2 className="property__host-title">Meet the host</h2>
                <div className="property__host-user user">
                  <div className="property__avatar-wrapper property__avatar-wrapper--pro user__avatar-wrapper">
                    <img
                      className="property__avatar user__avatar"
                      src={avatarUrl}
                      width="74"
                      height="74"
                      alt="Host avatar"
                    />
                  </div>
                  <span className="property__user-name">{name}</span>
                  <span className="property__user-status">{isPro}</span>
                </div>
                <div className="property__description">
                  <p className="property__text">
                    A quiet cozy and picturesque that hides behind a a river by
                    the unique lightness of Amsterdam. The building is green and
                    from 18th century.
                  </p>
                  <p className="property__text">
                    An independent House, strategically located between Rembrand
                    Square and National Opera, but where the bustle of the city
                    comes to rest in this alley flowery and colorful.
                  </p>
                </div>
              </div>
              <section className="property__reviews reviews">
                <h2 className="reviews__title">
                  Reviews &middot;{' '}
                  <span className="reviews__amount">{reviews.length}</span>
                </h2>
                <ReviewList />
                <ReviewForm />
              </section>
            </div>
          </div>
          <Map
            className="property__map"
            city={cityLocation}
            offers={nearOffers}
            selectedOfferId={room.id}
          />
        </section>
        <div className="container">
          <section className="near-places places">
            <h2 className="near-places__title">
              Other places in the neighbourhood
            </h2>
            <ListOffers
              offers={offers.slice(0, COUNT_NEAR_OFFER)}
              cardType="property"
              classNames="near-places__list"
            />
          </section>
        </div>
      </main>
    </Layout>
  );
};
export default Property;
