import { Action } from 'redux';
import thunk, { ThunkDispatch } from 'redux-thunk';
import MockAdapter from 'axios-mock-adapter';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { createAPI } from '../services/api';
import {
  checkAuthAction,
  loginAction,
  logoutAction,
  fetchOffersAction,
  fetchPropertyOfferAction,
  fetchNearbyAction,
  fetchCommentsAction,
  postCommentAction,
} from './api-actions';
import { State } from '../types/state';
import { AuthData } from '../types/auth-data';
import { redirectToRoute } from './action';
import { APIRoute } from '../const/const';
import { datatype } from 'faker';
import {
  makeFakeOffer,
  makeFakeReviewPayload,
  makeFakeReviews,
  makeFakeUserData,
} from '../mocks/mocks';
import { AUTH_TOKEN_KEY_NAME } from '../services/token';

const offers = Array.from({ length: datatype.number(10) }, () =>
  makeFakeOffer()
);
const offer = makeFakeOffer();
const id = 1;
const reviews = makeFakeReviews();
const postReview = makeFakeReviewPayload();
const user = makeFakeUserData();

describe('Async actions', () => {
  const api = createAPI();
  const mockAPI = new MockAdapter(api);
  const middlewares = [thunk.withExtraArgument(api)];

  const mockStore = configureMockStore<
    State,
    Action<string>,
    ThunkDispatch<State, typeof api, Action>
  >(middlewares);

  it('should fetch offers when server return 200', async () => {
    const store = mockStore();
    mockAPI.onGet(APIRoute.Offers).reply(200, offers);

    expect(store.getActions()).toEqual([]);

    await store.dispatch(fetchOffersAction());

    const actions = store.getActions().map(({ type }) => type);

    expect(actions).toEqual([
      fetchOffersAction.pending.type,
      fetchOffersAction.fulfilled.type,
    ]);
  });

  it('should fetch property offer when server return 200', async () => {
    const store = mockStore();
    mockAPI.onGet(`${APIRoute.Offers}/${id}`).reply(200, offer);

    expect(store.getActions()).toEqual([]);

    await store.dispatch(fetchPropertyOfferAction(id));

    const actions = store.getActions().map(({ type }) => type);

    expect(actions).toEqual([
      fetchPropertyOfferAction.pending.type,
      fetchPropertyOfferAction.fulfilled.type,
    ]);
  });

  it('should fetch nearby offers when server return 200', async () => {
    const store = mockStore();
    mockAPI.onGet(`${APIRoute.Offers}/${id}/nearby`).reply(200, offers);

    expect(store.getActions()).toEqual([]);

    await store.dispatch(fetchNearbyAction(id));

    const actions = store.getActions().map(({ type }) => type);

    expect(actions).toEqual([
      fetchNearbyAction.pending.type,
      fetchNearbyAction.fulfilled.type,
    ]);
  });

  it('should authorization status is «auth» when server return 200', async () => {
    const store = mockStore();
    mockAPI.onGet(APIRoute.Login).reply(200, user);

    expect(store.getActions()).toEqual([]);

    await store.dispatch(checkAuthAction());

    const actions = store.getActions().map(({ type }) => type);

    expect(actions).toEqual([
      checkAuthAction.pending.type,
      checkAuthAction.fulfilled.type,
    ]);
  });

  it('should dispatch RequriedAuthorization and RedirectToRoute when POST /login', async () => {
    const fakeUser: AuthData = { login: 'test@test.ru', password: '1gr' };

    mockAPI.onPost(APIRoute.Login).reply(200, { token: 'secret' });

    const store = mockStore();
    Storage.prototype.setItem = jest.fn();

    await store.dispatch(loginAction(fakeUser));

    const actions = store.getActions().map(({ type }) => type);

    expect(actions).toEqual([
      loginAction.pending.type,
      redirectToRoute.type,
      loginAction.fulfilled.type,
    ]);

    expect(Storage.prototype.setItem).toBeCalledTimes(1);
    expect(Storage.prototype.setItem).toBeCalledWith(
      AUTH_TOKEN_KEY_NAME,
      'secret'
    );
  });

  it('should fetch reviews action when server returns 200', async () => {
    const store = mockStore();
    mockAPI.onGet(`${APIRoute.Comments}${id}`).reply(200, reviews);

    expect(store.getActions()).toEqual([]);
    await store.dispatch(fetchCommentsAction(Number(id)));
    const actions = store.getActions().map(({ type }) => type);
    expect(actions).toEqual([
      fetchCommentsAction.pending.type,
      fetchCommentsAction.fulfilled.type,
    ]);
  });

  it('should post review action when server returns 200', async () => {
    const store = mockStore();
    mockAPI.onPost(`${APIRoute.Comments}${postReview.id}`).reply(200, reviews);

    expect(store.getActions()).toEqual([]);
    await store.dispatch(postCommentAction(postReview));
    const actions = store.getActions().map(({ type }) => type);
    expect(actions).toEqual([
      postCommentAction.pending.type,
      postCommentAction.fulfilled.type,
    ]);
  });

  it('should dispatch Logout when Delete /logout', async () => {
    mockAPI.onDelete(APIRoute.Logout).reply(204);

    const store = mockStore();
    Storage.prototype.removeItem = jest.fn();

    await store.dispatch(logoutAction());

    const actions = store.getActions().map(({ type }) => type);

    expect(actions).toEqual([
      logoutAction.pending.type,
      fetchOffersAction.pending.type,
      logoutAction.fulfilled.type,
    ]);

    expect(Storage.prototype.removeItem).toBeCalledTimes(1);
    expect(Storage.prototype.removeItem).toBeCalledWith(AUTH_TOKEN_KEY_NAME);
  });
});
