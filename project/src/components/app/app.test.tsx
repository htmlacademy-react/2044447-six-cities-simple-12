import { render, screen } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import { Provider } from 'react-redux';
import { configureMockStore } from '@jedmao/redux-mock-store';
import {
  AuthorizationStatus,
  AppRoute,
  FetchStatus,
  NameSpace,
  CITIES,
  COUNT_NEAR_OFFER,
  SortingTypes,
} from '../../const/const';
import App from './app';
import thunk, { ThunkDispatch } from 'redux-thunk';
import { createAPI } from '../../services/api';
import { Action } from '@reduxjs/toolkit';
import { State } from '../../types/state';
import { makeFakeOffer, makeFakeUserData } from '../../mocks/mocks';
import { datatype } from 'faker';
import HistoryRouter from '../history-router/history-router';
import { HelmetProvider } from 'react-helmet-async';

const api = createAPI();
const middlewares = [thunk.withExtraArgument(api)];
const mockStore = configureMockStore<
  State,
  Action<string>,
  ThunkDispatch<State, typeof api, Action>
>(middlewares);

const fakeOffer = makeFakeOffer();
const fakeOffers = Array.from({ length: datatype.number(10) }, () =>
  makeFakeOffer()
);
const fakeUserData = makeFakeUserData();

const fakeStore = {
  [NameSpace.User]: {
    authorizationStatus: AuthorizationStatus.Auth,
    info: fakeUserData,
    fetchStatus: FetchStatus.Success,
  },
  [NameSpace.Offers]: {
    offers: fakeOffers,
    offersStatus: FetchStatus.Success,
    offer: fakeOffer,
    offerStatus: FetchStatus.Success,
  },
  [NameSpace.Comments]: {
    comments: [],
    commentsStatus: FetchStatus.Success,
    commentStatus: FetchStatus.Idle,
  },
  [NameSpace.Nearby]: {
    offers: fakeOffers.slice(0, COUNT_NEAR_OFFER),
    offersStatus: FetchStatus.Success,
  },
  [NameSpace.App]: {
    city: CITIES[0],
    sortName: SortingTypes[0],
  },
};

const history = createMemoryHistory();

const fakeApp = (
  <Provider store={mockStore(fakeStore)}>
    <HelmetProvider>
      <HistoryRouter history={history}>
        <App />
      </HistoryRouter>
    </HelmetProvider>
  </Provider>
);

describe('Application Routing', () => {
  it('should render "Home" when user navigate to "/"', () => {
    history.push(AppRoute.Root);

    render(fakeApp);

    expect(screen.getByText('Cities')).toBeInTheDocument();
    expect(screen.getByText('Paris')).toBeInTheDocument();
    expect(screen.getByText('Cologne')).toBeInTheDocument();
    expect(screen.getByText('Brussels')).toBeInTheDocument();
    expect(screen.getByText('Amsterdam')).toBeInTheDocument();
    expect(screen.getByText('Hamburg')).toBeInTheDocument();
    expect(screen.getByText('Dusseldorf')).toBeInTheDocument();
  });

  it('should render "Login" when user navigate to "/login"', () => {
    history.push(AppRoute.Login);

    render(
      <Provider
        store={mockStore({
          ...fakeStore,
          [NameSpace.User]: {
            ...fakeStore[NameSpace.User],
            authorizationStatus: AuthorizationStatus.NoAuth,
          },
        })}
      >
        <HelmetProvider>
          <HistoryRouter history={history}>
            <App />
          </HistoryRouter>
        </HelmetProvider>
      </Provider>
    );

    expect(screen.getByRole('button').textContent).toBe('Sign in');
    expect(screen.getByPlaceholderText(/email/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/password/i)).toBeInTheDocument();
  });

  it('should render "Property" when user navigate to "/offer/:id"', () => {
    history.push(AppRoute.Property);

    render(fakeApp);

    expect(screen.getByText(/Meet the host/i)).toBeInTheDocument();
    expect(
      screen.getByText(/Other places in the neighbourhood/i)
    ).toBeInTheDocument();
  });

  it('should render "NotFoundPage" when user navigate to non-existent route', () => {
    history.push('/non-existent-route');

    render(fakeApp);

    expect(screen.getByText('Click to return to home')).toBeInTheDocument();
  });
});
