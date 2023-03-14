import { createReducer } from '@reduxjs/toolkit';
import { CITIES } from '../const/const';
import { offers } from '../mocks/offers';
import { Offer } from '../types/offer';
import { changeCity } from './action';

type InitialState = {
  city: string;
  offers: Offer[];
};

const initialState: InitialState = {
  offers: offers,
  city: CITIES[0],
};

const reducer = createReducer(initialState, (builder) => {
  builder.addCase(changeCity, (state, action) => {
    state.city = action.payload;
  });
});

export { reducer };
