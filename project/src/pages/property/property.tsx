import React from 'react';
import { useParams } from 'react-router-dom';
import Badge from '../../components/badge/badge';
import Layout from '../../components/layout/layout';
import ListOffers from '../../components/list-offers/list-offers';
import LoadingScreen from '../../components/loading-screen/loading-screen';
import Map from '../../components/map/map';
import PropertyImage from '../../components/property-image/property-image';
import PropertyItem from '../../components/property-item/property-item';
import ReviewForm from '../../components/review-form/review-form';
import ReviewList from '../../components/review-list/review-list';
import {
  AuthorizationStatus,
  COUNT_NEAR_OFFER,
  MAX_PHOTOS,
} from '../../const/const';
import { useAppDispatch, useAppSelector } from '../../hooks';
import {
  fetchCommentsAction,
  fetchNearbyAction,
  fetchPropertyOfferAction,
} from '../../store/api-actions';
import { sortComments } from '../../store/comments/selectors';
import { getNearbyOffers } from '../../store/nearby-offers/selectors';
import {
  getPropertyOffer,
  getPropertyOfferStatus,
} from '../../store/offers/selectors';
import { getAuthorizationStatus } from '../../store/user-process/selectors';
import { getRatingColor } from '../../utils/utils';
import FullPageError from '../full-page-error/full-page-error';

const Property: React.FC = () => {
  const { id } = useParams();

  const authorizationStatus = useAppSelector(getAuthorizationStatus);
  const { isLoading, isError } = useAppSelector(getPropertyOfferStatus);
  const dispatch = useAppDispatch();
  const statusLogOut = authorizationStatus === AuthorizationStatus.NoAuth;
  const isAuth = authorizationStatus === AuthorizationStatus.Auth;

  React.useEffect(() => {
    if (id) {
      dispatch(fetchCommentsAction(Number(id)));
      dispatch(fetchNearbyAction(Number(id)));
      dispatch(fetchPropertyOfferAction(Number(id)));
    }
  }, [id, dispatch, statusLogOut]);

  const comments = useAppSelector(sortComments);
  const nearbyOffers = useAppSelector(getNearbyOffers);
  const room = useAppSelector(getPropertyOffer);

  if (isLoading || !room) {
    return <LoadingScreen type="big" />;
  }

  if (isError) {
    return <FullPageError />;
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

  const nearOffers = [...nearbyOffers.slice(0, COUNT_NEAR_OFFER), room];

  return (
    <Layout pageTitle="Property">
      <main className="page__main page__main--property">
        <section className="property">
          <div className="property__gallery-container container">
            <div className="property__gallery">
              {images.slice(0, MAX_PHOTOS).map((img) => (
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
                  <span className="reviews__amount">{comments.length}</span>
                </h2>
                <ReviewList comments={comments} />
                {isAuth && <ReviewForm />}
              </section>
            </div>
          </div>
          <Map
            className="property__map"
            city={cityLocation}
            offers={nearOffers}
            selectedOfferId={room.id}
            height="560px"
          />
        </section>
        <div className="container">
          <section className="near-places places">
            <h2 className="near-places__title">
              Other places in the neighbourhood
            </h2>
            <ListOffers
              offers={nearbyOffers}
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
