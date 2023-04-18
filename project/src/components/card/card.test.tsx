import { configureMockStore } from '@jedmao/redux-mock-store';
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import { MemoryRouter } from 'react-router-dom';
import { makeFakeOffer, makeFakeUserData } from '../../mocks/mocks';
import Card from './card';
import { createAPI } from '../../services/api';
import { State } from '../../types/state';
import { Action, ThunkDispatch } from '@reduxjs/toolkit';
import { AuthorizationStatus, FetchStatus, NameSpace } from '../../const/const';

const api = createAPI();
const middlewares = [thunk.withExtraArgument(api)];
const mockStore = configureMockStore<
  State,
  Action<string>,
  ThunkDispatch<State, typeof api, Action>
>(middlewares);
const fakeUserData = makeFakeUserData();

const fakeStore = {
  [NameSpace.Comments]: {
    comments: [],
    commentsStatus: FetchStatus.Success,
    commentStatus: FetchStatus.Idle,
  },
  [NameSpace.User]: {
    authorizationStatus: AuthorizationStatus.Auth,
    info: fakeUserData,
    fetchStatus: FetchStatus.Success,
  },
};

const offer = makeFakeOffer();
const { previewImage, price, title } = offer;

describe('Component: Card', () => {
  offer.isPremium = true;
  offer.type = 'house';
  const store = mockStore(fakeStore);

  it('should render correctly', () => {
    render(
      <Provider store={store}>
        <MemoryRouter>
          <Card offer={offer} onCardHover={jest.fn()} cardType="home" />
        </MemoryRouter>
      </Provider>
    );

    expect(screen.getByText(`€${price}`)).toBeInTheDocument();
    expect(screen.getByText(title)).toBeInTheDocument();
    expect(screen.getByText('Premium')).toBeInTheDocument();
    expect(screen.getByText(/house/i)).toBeInTheDocument();
    expect(screen.getByAltText(title)).toHaveAttribute('src', previewImage);
  });
});
