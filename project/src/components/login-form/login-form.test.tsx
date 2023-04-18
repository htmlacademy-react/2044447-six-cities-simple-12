import { act, render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { AuthorizationStatus, FetchStatus } from '../../const/const';
import { makeFakeUserData } from '../../mocks/mocks';
import { UserProcess } from '../../types/state';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';
import LoginForm from './login-form';

const mockStore = configureMockStore();

const mockUserState: UserProcess = {
  authorizationStatus: AuthorizationStatus.Auth,
  info: makeFakeUserData(),
  fetchStatus: FetchStatus.Success,
};

const fakeStore = mockStore({
  USER: mockUserState,
});

describe('Component: LoginForm', () => {
  it('should update login inputs', async () => {
    render(
      <Provider store={fakeStore}>
        <MemoryRouter>
          <LoginForm />
        </MemoryRouter>
      </Provider>
    );

    await act(
      async () =>
        await userEvent.type(
          screen.getByPlaceholderText(/email/i),
          'test@test.ru'
        )
    );
    await act(
      async () =>
        await userEvent.type(screen.getByPlaceholderText(/password/i), 'a123')
    );

    expect(screen.getByDisplayValue('test@test.ru')).toBeInTheDocument();
    expect(screen.getByDisplayValue('a123')).toBeInTheDocument();
  });
});
