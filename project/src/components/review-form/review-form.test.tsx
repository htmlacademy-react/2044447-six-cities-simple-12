import { act, render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureMockStore } from '@jedmao/redux-mock-store';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';
import thunk from 'redux-thunk';
import ReviewForm from './review-form';
import { createAPI } from '../../services/api';
import { Action, ThunkDispatch } from '@reduxjs/toolkit';
import { State } from '../../types/state';
import { makeFakeUserData } from '../../mocks/mocks';
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

describe('Component: ReviewForm', () => {
  it('should update review inputs', async () => {
    render(
      <Provider store={mockStore(fakeStore)}>
        <MemoryRouter>
          <ReviewForm />
        </MemoryRouter>
      </Provider>
    );

    expect(screen.getByText('Submit')).toBeInTheDocument();
    await act(
      async () =>
        await userEvent.type(screen.getByRole('textbox'), 'test message')
    );
    expect(screen.getByDisplayValue(/test message/i)).toBeInTheDocument();
  });
});
