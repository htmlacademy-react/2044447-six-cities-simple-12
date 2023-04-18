import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import { AuthorizationStatus, FetchStatus, NameSpace } from '../../const/const';
import { configureMockStore } from '@jedmao/redux-mock-store';
import Header from './header';

const mockStore = configureMockStore();
const fakeStore = {
  [NameSpace.User]: {
    authorizationStatus: AuthorizationStatus.NoAuth,
    info: null,
    fetchStatus: FetchStatus.Success,
  },
};

describe('Component: Header', () => {
  it('should render correctly', () => {
    const store = mockStore(fakeStore);
    render(
      <Provider store={store}>
        <MemoryRouter>
          <Header />
        </MemoryRouter>
      </Provider>
    );

    const testElement = screen.getByTestId('header');

    expect(testElement).toBeInTheDocument();
  });
});
