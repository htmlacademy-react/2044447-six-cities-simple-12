import { createSelector } from '@reduxjs/toolkit';
import { FetchStatus, NameSpace } from '../../const/const';
import { Offer } from '../../types/offer';
import { State } from '../../types/state';

export const getOffers = (state: State): Offer[] =>
  state[NameSpace.Offers].offers;

export const getStatus = (state: State): FetchStatus =>
  state[NameSpace.Offers].offersStatus;

export const getPropertyOffer = (state: State): Offer | null =>
  state[NameSpace.Offers].offer;

export const getPropertyStatus = (state: State): FetchStatus =>
  state[NameSpace.Offers].offerStatus;

export const getOffersStatus = createSelector([getStatus], (status) => ({
  isLoading: [FetchStatus.Idle, FetchStatus.Loading].includes(status),
  isSuccess: status === FetchStatus.Success,
  isError: status === FetchStatus.Failed,
}));

export const getPropertyOfferStatus = createSelector(
  [getPropertyStatus],
  (status) => ({
    isLoading: [FetchStatus.Idle, FetchStatus.Loading].includes(status),
    isSuccess: status === FetchStatus.Success,
    isError: status === FetchStatus.Failed,
  })
);
