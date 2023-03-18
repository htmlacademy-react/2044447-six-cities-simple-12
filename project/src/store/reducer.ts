import { createReducer } from '@reduxjs/toolkit';
import { AuthorizationStatus, CITIES, SortingTypes } from '../const/const';
import { Offer } from '../types/offer';
import {
  changeCity,
  changeSort,
  loadOffers,
  requireAuthorization,
  setError,
  setOffersDataLoadingStatus,
} from './action';

type InitialState = {
  city: string;
  offers: Offer[];
  sortName: string;
  authorizationStatus: AuthorizationStatus;
  isOffersDataLoading: boolean;
  error: string | null;
};

const initialState: InitialState = {
  offers: [],
  city: CITIES[0],
  sortName: SortingTypes[0],
  authorizationStatus: AuthorizationStatus.Unknown,
  isOffersDataLoading: false,
  error: null,
};

const reducer = createReducer(initialState, (builder) => {
  builder
    .addCase(changeCity, (state, action) => {
      state.city = action.payload;
    })
    .addCase(changeSort, (state, action) => {
      state.sortName = action.payload;
    })
    .addCase(loadOffers, (state, action) => {
      state.offers = action.payload;
    })
    .addCase(setOffersDataLoadingStatus, (state, action) => {
      state.isOffersDataLoading = action.payload;
    })
    .addCase(requireAuthorization, (state, action) => {
      state.authorizationStatus = action.payload;
    })
    .addCase(setError, (state, action) => {
      state.error = action.payload;
    });
});

export { reducer };
