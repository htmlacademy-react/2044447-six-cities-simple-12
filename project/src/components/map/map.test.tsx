import { render, screen } from '@testing-library/react';
import Map from './map';
import { makeFakeCity, makeFakeOffers } from '../../mocks/mocks';
import { datatype } from 'faker';

const offers = makeFakeOffers();
const selectedOfferId = 1;
const city = makeFakeCity();
const classlist = datatype.string();
const height = '100%';

describe('Component: Map', () => {
  it('should render correctly', () => {
    render(
      <Map
        offers={offers}
        selectedOfferId={selectedOfferId}
        city={city}
        className={classlist}
        height={height}
      />
    );

    expect(screen.getByTestId('map')).toBeInTheDocument();
    screen.getByTestId('map').classList.contains(classlist);
  });
});
