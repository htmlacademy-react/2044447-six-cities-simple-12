import { configureMockStore } from '@jedmao/redux-mock-store';
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import { AuthorizationStatus, FetchStatus, NameSpace } from '../../const/const';
import { makeFakeOffers } from '../../mocks/mocks';
import ListOffers from './list-offers';

const fakeOffers = makeFakeOffers();
const cardType = 'home';
const classNames = 'cities__places-list';

const mockStore = configureMockStore();
const fakeStore = {
  [NameSpace.User]: {
    authorizationStatus: AuthorizationStatus.NoAuth,
    info: null,
    fetchStatus: FetchStatus.Success,
  },
  [NameSpace.Offers]: {
    offers: fakeOffers,
    offersStatus: FetchStatus.Success,
  },
};

describe('Component: ListOffers', () => {
  it('should render correctly', () => {
    const store = mockStore(fakeStore);

    render(
      <Provider store={store}>
        <MemoryRouter>
          <ListOffers
            offers={fakeOffers}
            onListItemHover={jest.fn()}
            cardType={cardType}
            classNames={classNames}
          />
        </MemoryRouter>
      </Provider>
    );

    expect(screen.getByTestId('offersList')).toBeInTheDocument();
  });
});
