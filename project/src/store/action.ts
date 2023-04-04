import { createAction } from '@reduxjs/toolkit';
import { AppRoute, AuthorizationStatus } from '../const/const';
import { Offer } from '../types/offer';
import { UserData } from '../types/user-data';

export const changeCity = createAction('offers/changeCity', (city: string) => ({
  payload: city,
}));

export const changeSort = createAction(
  'offers/changeSort',
  (sortName: string) => ({ payload: sortName })
);

export const loadOffers = createAction(
  'data/loadOffers',
  (offers: Offer[]) => ({ payload: offers })
);

export const requireAuthorization = createAction(
  'user/requireAuthorization',
  (authorizationStatus: AuthorizationStatus) => ({
    payload: authorizationStatus,
  })
);

export const getInformationUser = createAction(
  'user/getInformationUser',
  (informationUser: UserData | null) => ({ payload: informationUser })
);

export const setError = createAction(
  'offers/setError',
  (error: string | null) => ({ payload: error })
);

export const setOffersDataLoadingStatus = createAction(
  'data/setOffersDataLoadingStatus',
  (isOffersDataLoading: boolean) => ({ payload: isOffersDataLoading })
);

export const redirectToRoute = createAction(
  'data/redirectToRoute',
  (redirect: AppRoute) => ({ payload: redirect })
);
