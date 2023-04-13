import { FetchStatus } from '../../const/const';
import { fetchOffersAction, fetchPropertyOfferAction } from '../api-actions';
import { makeFakeOffer } from '../../mocks/mocks';
import { OffersData } from '../../types/state';
import { datatype } from 'faker';
import { offersData } from './offers';

const offer = makeFakeOffer();
const offers = Array.from({ length: datatype.number(10) }, () =>
  makeFakeOffer()
);

describe('Reducer: offersData', () => {
  let initialState: OffersData;

  beforeEach(() => {
    initialState = {
      offers: [],
      offersStatus: FetchStatus.Idle,
      offer: null,
      offerStatus: FetchStatus.Idle,
    };
  });
  it('without additional parameters should return initial state', () => {
    expect(offersData.reducer(void 0, { type: 'UNKNOWN_ACTION' })).toEqual(
      initialState
    );
  });

  describe('fetchOffersAction test', () => {
    it('should update offersStatus to "Loading" when pending', () => {
      expect(
        offersData.reducer(initialState, {
          type: fetchOffersAction.pending.type,
        })
      ).toEqual({ ...initialState, offersStatus: FetchStatus.Loading });
    });

    it('should update offersStatus by load offers', () => {
      expect(
        offersData.reducer(initialState, {
          type: fetchOffersAction.fulfilled.type,
          payload: offers,
        })
      ).toEqual({ ...initialState, offers, offersStatus: FetchStatus.Success });
    });

    it('should update offersStatus failed if server is unavailable', () => {
      expect(
        offersData.reducer(initialState, {
          type: fetchOffersAction.rejected.type,
        })
      ).toEqual({ ...initialState, offersStatus: FetchStatus.Failed });
    });
  });

  describe('fetchPropertyOfferAction test', () => {
    it('should update offerStatus to "Loading" when pending', () => {
      expect(
        offersData.reducer(initialState, {
          type: fetchPropertyOfferAction.pending.type,
        })
      ).toEqual({ ...initialState, offerStatus: FetchStatus.Loading });
    });

    it('should update offerStatus by load offer', () => {
      expect(
        offersData.reducer(initialState, {
          type: fetchPropertyOfferAction.fulfilled.type,
          payload: offer,
        })
      ).toEqual({ ...initialState, offer, offerStatus: FetchStatus.Success });
    });

    it('should update offerStatus failed if server is unavailable', () => {
      expect(
        offersData.reducer(initialState, {
          type: fetchPropertyOfferAction.rejected.type,
        })
      ).toEqual({ ...initialState, offerStatus: FetchStatus.Failed });
    });
  });
});
