import { createAction } from '@reduxjs/toolkit';
import { AppRoute } from '../const/const';

export const redirectToRoute = createAction(
  'data/redirectToRoute',
  (redirect: AppRoute) => ({ payload: redirect })
);
