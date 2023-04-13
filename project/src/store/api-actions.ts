import { AxiosInstance } from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { AppDispatch, State } from '../types/state.js';
import { Offer } from '../types/offer';
import { CreateReviewPayload, Review } from '../types/review';
import { redirectToRoute } from './action';
import { saveToken, dropToken } from '../services/token';
import { APIRoute, AppRoute } from '../const/const';
import { AuthData } from '../types/auth-data';
import { UserData } from '../types/user-data';
import { pushNotification } from './notification/notification';

type ThunkOptions = {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
};

export const fetchOffersAction = createAsyncThunk<
  Offer[],
  undefined,
  ThunkOptions
>('data/fetchOffers', async (_arg, { dispatch, extra: api }) => {
  try {
    const { data } = await api.get<Offer[]>(APIRoute.Offers);
    return data;
  } catch (err) {
    dispatch(
      pushNotification({
        type: 'error',
        message: 'Unfortunately, we can\'t show offers',
      })
    );
    throw err;
  }
});

export const fetchPropertyOfferAction = createAsyncThunk<
  Offer,
  number,
  ThunkOptions
>('data/fetchPropertyOffer', async (id, { dispatch, extra: api }) => {
  try {
    const { data } = await api.get<Offer>(`${APIRoute.Offers}/${id}`);
    return data;
  } catch (err) {
    dispatch(
      pushNotification({
        type: 'error',
        message: 'Unfortunately, we can\'t show room page',
      })
    );
    throw err;
  }
});

export const fetchNearbyAction = createAsyncThunk<
  Offer[],
  number,
  ThunkOptions
>('data/fetchNearbyOffers', async (id, { dispatch, extra: api }) => {
  try {
    const { data } = await api.get<Offer[]>(`${APIRoute.Offers}/${id}/nearby`);
    return data;
  } catch (err) {
    dispatch(
      pushNotification({
        type: 'error',
        message: 'Unfortunately, we can\'t show nearby offers',
      })
    );
    throw err;
  }
});

export const fetchCommentsAction = createAsyncThunk<
  Review[],
  number,
  ThunkOptions
>('data/comments', async (id, { dispatch, extra: api }) => {
  try {
    const { data } = await api.get<Review[]>(`${APIRoute.Comments}${id}`);
    return data;
  } catch (err) {
    dispatch(
      pushNotification({
        type: 'error',
        message: 'Unfortunately, we can\'t show comments',
      })
    );
    throw err;
  }
});

export const postCommentAction = createAsyncThunk<
  Review[],
  CreateReviewPayload,
  ThunkOptions
>('data/comment', async ({ comment, rating, id }, { dispatch, extra: api }) => {
  try {
    const { data } = await api.post<Review[]>(`${APIRoute.Comments}${id}`, {
      comment,
      rating,
    });
    return data;
  } catch (err) {
    dispatch(
      pushNotification({ type: 'error', message: 'Please repeat send comment' })
    );
    throw err;
  }
});

export const checkAuthAction = createAsyncThunk<
  UserData,
  undefined,
  ThunkOptions
>('user/checkAuth', async (_arg, { dispatch, extra: api }) => {
  try {
    const { data } = await api.get<UserData>(APIRoute.Login);
    return data;
  } catch (err) {
    dispatch(
      pushNotification({ type: 'info', message: 'More features after login' })
    );
    throw err;
  }
});

export const loginAction = createAsyncThunk<UserData, AuthData, ThunkOptions>(
  'user/login',
  async ({ login: email, password }, { dispatch, extra: api }) => {
    try {
      const { data } = await api.post<UserData>(APIRoute.Login, {
        email,
        password,
      });
      saveToken(data.token);
      dispatch(redirectToRoute(AppRoute.Root));
      return data;
    } catch (err) {
      dispatch(
        pushNotification({ type: 'error', message: 'Please repeat log in' })
      );
      throw err;
    }
  }
);

export const logoutAction = createAsyncThunk<void, undefined, ThunkOptions>(
  'user/logout',
  async (_arg, { dispatch, extra: api }) => {
    try {
      await api.delete(APIRoute.Logout);
      dropToken();
      dispatch(fetchOffersAction());
    } catch (err) {
      dispatch(
        pushNotification({ type: 'error', message: 'Please repeat log out' })
      );
      throw err;
    }
  }
);
