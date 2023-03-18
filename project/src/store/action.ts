import { createAction } from '@reduxjs/toolkit';
import { AuthorizationStatus } from '../const/const';
import { Offer } from '../types/offer';

export const changeCity = createAction('offers/changeCity', (city: string) => ({
  payload: city,
}));

export const changeSort = createAction(
  'offers/changeSort',
  (sortName: string) => ({ payload: sortName })
);

export const loadOffers = createAction(
  'offers/loadOffers',
  (offers: Offer[]) => ({ payload: offers })
);

export const requireAuthorization = createAction(
  'user/requireAuthorization',
  (authorizationStatus: AuthorizationStatus) => ({
    payload: authorizationStatus,
  })
);

export const setError = createAction(
  'offers/setError',
  (error: string | null) => ({ payload: error })
);

export const setOffersDataLoadingStatus = createAction(
  'data/setOffersDataLoadingStatus',
  (isOffersDataLoading: boolean) => ({ payload: isOffersDataLoading })
);
