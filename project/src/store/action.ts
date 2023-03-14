import { createAction } from '@reduxjs/toolkit';

export const changeCity = createAction('offers/changeCity', (city: string) => ({
  payload: city,
}));

export const changeSort = createAction(
  'offers/changeSort',
  (sortName: string) => ({ payload: sortName })
);
