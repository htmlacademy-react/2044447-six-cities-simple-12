import { createAction } from '@reduxjs/toolkit';

export const changeCity = createAction('offers/changeCity', (city: string) => ({
  payload: city,
}));
