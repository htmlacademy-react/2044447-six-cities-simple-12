import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import { MemoryRouter } from 'react-router-dom';
import { SortingTypes } from '../../const/const';
import Sort from './sort';
import { configureMockStore } from '@jedmao/redux-mock-store';

const currentSortName = SortingTypes[1];
const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('Component: Sort', () => {
  it('should render correctly', () => {
    const store = mockStore({});
    render(
      <Provider store={store}>
        <MemoryRouter>
          <Sort currentSortName={currentSortName} />
        </MemoryRouter>
      </Provider>
    );

    const paragraphElement = screen.getByText(currentSortName);

    expect(paragraphElement).toBeInTheDocument();
  });
});
