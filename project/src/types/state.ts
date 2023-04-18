import { AuthorizationStatus, FetchStatus } from '../const/const.js';
import { store } from '../store/index.js';
import { Offer } from './offer.js';
import { Review } from './review.js';
import { UserData } from './user-data.js';

export type State = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

export type UserProcess = {
  authorizationStatus: AuthorizationStatus;
  info: null | UserData;
  fetchStatus: FetchStatus;
};

export type NearbyOffersData = {
  offers: Offer[];
  offersStatus: FetchStatus;
};

export type AppData = {
  city: string;
  sortName: string;
};

export type CommentsData = {
  comments: Review[];
  commentsStatus: FetchStatus;
  commentStatus: FetchStatus;
};

export type OffersData = {
  offers: Offer[];
  offersStatus: FetchStatus;
  offer: Offer | null;
  offerStatus: FetchStatus;
};
