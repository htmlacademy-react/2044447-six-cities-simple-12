import { createSlice } from '@reduxjs/toolkit';
import { FetchStatus, NameSpace } from '../../const/const';
import { NearbyOffersData } from '../../types/state';
import { fetchNearbyAction } from '../api-actions';

const initialState: NearbyOffersData = {
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
