import { configureMockStore } from '@jedmao/redux-mock-store';
import { Action, ThunkDispatch } from '@reduxjs/toolkit';
import { render, screen } from '@testing-library/react';
import { HelmetProvider } from 'react-helmet-async';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import { MemoryRouter } from 'react-router-dom';
import {
  AuthorizationStatus,
  CITIES,
  FetchStatus,
  NameSpace,
  SortingTypes,
} from '../../const/const';
import { makeFakeOffers } from '../../mocks/mocks';
import { createAPI } from '../../services/api';
import { State } from '../../types/state';
import Home from './home';

const api = createAPI();
const middlewares = [thunk.withExtraArgument(api)];
const mockStore = configureMockStore<
  State,
  Action<string>,
  ThunkDispatch<State, typeof api, Action>
>(middlewares);

const fakeOffers = makeFakeOffers();

const fakeStore = {
  [NameSpace.User]: {
    authorizationStatus: AuthorizationStatus.NoAuth,
    info: null,
    fetchStatus: FetchStatus.Success,
  },
  [NameSpace.Offers]: {
    offers: [],
    offersStatus: FetchStatus.Success,
  },
  [NameSpace.App]: {
    city: CITIES[0],
    sortName: SortingTypes[0],
  },
};

describe('Page: Home', () => {
  it('should render correctly if data received and offers are empty', () => {
    const store = mockStore(fakeStore);

    render(
      <Provider store={store}>
        <MemoryRouter>
          <HelmetProvider>
            <Home />
          </HelmetProvider>
        </MemoryRouter>
      </Provider>
    );

    expect(
      screen.getByText(/No places to stay available/i)
    ).toBeInTheDocument();
  });

  it('should render correctly if data pending', () => {
    const store = mockStore({
      ...fakeStore,
      [NameSpace.Offers]: {
        ...fakeStore[NameSpace.Offers],
        offersStatus: FetchStatus.Loading,
      },
    });

    render(
      <Provider store={store}>
        <MemoryRouter>
          <HelmetProvider>
            <Home />
          </HelmetProvider>
        </MemoryRouter>
      </Provider>
    );

    expect(screen.getByText(/Loading/i)).toBeInTheDocument();
  });

  it('should render correctly if data received', () => {
    const store = mockStore({
      ...fakeStore,
      [NameSpace.Offers]: {
        ...fakeStore[NameSpace.Offers],
        offers: fakeOffers,
      },
    });

    render(
      <Provider store={store}>
        <MemoryRouter>
          <HelmetProvider>
            <Home />
          </HelmetProvider>
        </MemoryRouter>
      </Provider>
    );

    expect(screen.getByText(/places to stay/i)).toBeInTheDocument();
  });
});
