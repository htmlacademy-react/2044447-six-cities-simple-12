import { act, render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { AuthorizationStatus, FetchStatus } from '../../const/const';
import { HelmetProvider } from 'react-helmet-async';
import { makeFakeUserData } from '../../mocks/mocks';
import { UserProcess } from '../../types/state';
import userEvent from '@testing-library/user-event';
import Login from './login';
import { MemoryRouter } from 'react-router-dom';

const mockStore = configureMockStore();

const mockUserState: UserProcess = {
  authorizationStatus: AuthorizationStatus.Auth,
  info: makeFakeUserData(),
  fetchStatus: FetchStatus.Success,
};

const fakeStore = mockStore({
  USER: mockUserState,
});

describe('Page: Login', () => {
  it('should render correctly', async () => {
    render(
      <Provider store={fakeStore}>
        <MemoryRouter>
          <HelmetProvider>
            <Login />
          </HelmetProvider>
        </MemoryRouter>
      </Provider>
    );

    expect(screen.getByPlaceholderText(/email/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/password/i)).toBeInTheDocument();

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
