import { createReducer } from '@reduxjs/toolkit';
import { CITIES, SortingTypes } from '../const/const';
import { offers } from '../mocks/offers';
import { Offer } from '../types/offer';
import { changeCity, changeSort } from './action';

type InitialState = {
  city: string;
  offers: Offer[];
  sortName: string;
};

const initialState: InitialState = {
  offers: offers,
  city: CITIES[0],
  sortName: SortingTypes[0],
};

const reducer = createReducer(initialState, (builder) => {
  builder
    .addCase(changeCity, (state, action) => {
      state.city = action.payload;
    })
    .addCase(changeSort, (state, action) => {
      state.sortName = action.payload;
    });
});

export { reducer };
