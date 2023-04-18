import { FetchStatus } from '../../const/const';
import { fetchNearbyAction } from '../api-actions';
import { makeFakeOffer } from '../../mocks/mocks';
import { NearbyOffersData } from '../../types/state';
import { datatype } from 'faker';
import { nearbyOffersData } from './nearby-offer';

const offers = Array.from({ length: datatype.number(10) }, () =>
  makeFakeOffer()
);

describe('Reducer: nearbyOffersData', () => {
  let initialState: NearbyOffersData;

  beforeEach(() => {
    initialState = {
      offers: [],
      offersStatus: FetchStatus.Idle,
    };
  });
  it('without additional parameters should return initial state', () => {
    expect(
      nearbyOffersData.reducer(void 0, { type: 'UNKNOWN_ACTION' })
    ).toEqual(initialState);
  });

  it('should update offersStatus to "Loading" when pending', () => {
    expect(
      nearbyOffersData.reducer(initialState, {
        type: fetchNearbyAction.pending.type,
      })
    ).toEqual({ ...initialState, offersStatus: FetchStatus.Loading });
  });

  it('should update offersStatus by load offers', () => {
    expect(
      nearbyOffersData.reducer(initialState, {
        type: fetchNearbyAction.fulfilled.type,
        payload: offers,
      })
    ).toEqual({ ...initialState, offers, offersStatus: FetchStatus.Success });
  });

  it('should update offersStatus failed if server is unavailable', () => {
    expect(
      nearbyOffersData.reducer(initialState, {
        type: fetchNearbyAction.rejected.type,
      })
    ).toEqual({ ...initialState, offersStatus: FetchStatus.Failed });
  });
});
