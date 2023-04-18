import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import { configureMockStore } from '@jedmao/redux-mock-store';
import userEvent from '@testing-library/user-event';
import FullPageError from './full-page-error';
import { HelmetProvider } from 'react-helmet-async';
import { MemoryRouter } from 'react-router-dom';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('Page: FullPageError', () => {
  it('should render correctly', () => {
    const store = mockStore({});
    render(
      <Provider store={store}>
        <MemoryRouter>
          <HelmetProvider>
            <FullPageError />
          </HelmetProvider>
        </MemoryRouter>
      </Provider>
    );

    expect(
      screen.getByText('Something was broken. We try to repair it!')
    ).toBeInTheDocument();
    expect(screen.getByRole('button').textContent).toBe('Please, click here');
  });

  it('should fetch offers if the button is clicked', async () => {
    const store = mockStore({});
    render(
      <Provider store={store}>
        <MemoryRouter>
          <HelmetProvider>
            <FullPageError />
          </HelmetProvider>
        </MemoryRouter>
      </Provider>
    );

    await userEvent.click(screen.getByRole('button'));

    const actions = store.getActions();

    expect(actions[0].type).toBe('data/fetchOffers/pending');
  });
});
