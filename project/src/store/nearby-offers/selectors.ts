import { FetchStatus, NameSpace } from '../../const/const';
import { Offer } from '../../types/offer';
import { State } from '../../types/state';

export const getNearbyOffers = (state: State): Offer[] =>
  state[NameSpace.Nearby].offers;

export const getNearbyStatus = (state: State): FetchStatus =>
  state[NameSpace.Nearby].offersStatus;
