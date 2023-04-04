import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { CITIES, NameSpace, SortingTypes } from '../../const/const';

type AppData = {
  city: string;
  sortName: string;
};

const initialState: AppData = {
  city: CITIES[0],
  sortName: SortingTypes[0],
};

export const appData = createSlice({
  name: NameSpace.App,
  initialState,
  reducers: {
    changeCity: (state, action: PayloadAction<string>) => {
      state.city = action.payload;
    },
    changeSort: (state, action: PayloadAction<string>) => {
      state.sortName = action.payload;
    },
  },
});

export const { changeCity, changeSort } = appData.actions;
