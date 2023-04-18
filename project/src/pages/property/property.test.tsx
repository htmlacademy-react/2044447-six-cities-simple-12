import { configureMockStore } from '@jedmao/redux-mock-store';
import { render, screen } from '@testing-library/react';
import { HelmetProvider } from 'react-helmet-async';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import {
  AuthorizationStatus,
  COUNT_NEAR_OFFER,
  FetchStatus,
  NameSpace,
} from '../../const/const';
import {
  makeFakeOffer,
  makeFakeOffers,
  makeFakeUserData,
} from '../../mocks/mocks';
import Property from './property';

const mockStore = configureMockStore();
const fakeOffer = makeFakeOffer();
const fakeOffers = makeFakeOffers();
const fakeUserData = makeFakeUserData();

const fakeStore = {
  [NameSpace.User]: {
    authorizationStatus: AuthorizationStatus.NoAuth,
    info: fakeUserData,
    fetchStatus: FetchStatus.Success,
  },
  [NameSpace.Offers]: {
    offers: fakeOffers,
    offersStatus: FetchStatus.Success,
    offer: [],
    offerStatus: FetchStatus.Idle,
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
  [NameSpace.User]: {
    authorizationStatus: AuthorizationStatus.NoAuth,
    info: null,
    fetchStatus: FetchStatus.Success,
  },
};

describe('Page: Property', () => {
  it('should render correctly if data pending', () => {
    const store = mockStore({
      ...fakeStore,
      [NameSpace.Offers]: {
        ...fakeStore[NameSpace.Offers],
        offerStatus: FetchStatus.Loading,
      },
    });

    render(
      <Provider store={store}>
        <MemoryRouter>
          <HelmetProvider>
            <Property />
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
        offer: fakeOffer,
        offerStatus: FetchStatus.Success,
      },
    });

    render(
      <Provider store={store}>
        <MemoryRouter>
          <HelmetProvider>
            <Property />
          </HelmetProvider>
        </MemoryRouter>
      </Provider>
    );

    expect(screen.getByText(/Meet the host/i)).toBeInTheDocument();
    expect(
      screen.getByText(/Other places in the neighbourhood/i)
    ).toBeInTheDocument();
  });
});
