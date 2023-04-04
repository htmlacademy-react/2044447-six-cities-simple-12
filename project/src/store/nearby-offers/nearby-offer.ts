import { createSlice } from '@reduxjs/toolkit';
import { FetchStatus, NameSpace } from '../../const/const';
import { Offer } from '../../types/offer';
import { fetchNearbyAction } from '../api-actions';

type nearbyOffersData = {
  offers: Offer[];
  offersStatus: FetchStatus;
};

const initialState: nearbyOffersData = {
  offers: [],
  offersStatus: FetchStatus.Idle,
};

export const nearbyOffersData = createSlice({
  name: NameSpace.Nearby,
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchNearbyAction.pending, (state) => {
        state.offersStatus = FetchStatus.Loading;
      })
      .addCase(fetchNearbyAction.fulfilled, (state, action) => {
        state.offers = action.payload;
        state.offersStatus = FetchStatus.Success;
      })
      .addCase(fetchNearbyAction.rejected, (state) => {
        state.offersStatus = FetchStatus.Failed;
      });
  },
});
