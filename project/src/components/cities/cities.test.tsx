import { render, screen } from '@testing-library/react';
import Cities from './cities';
import { CITIES } from '../../const/const';
import { MemoryRouter } from 'react-router-dom';

const currentCity = CITIES[1];

describe('Component: Cities', () => {
  it('should render correctly', () => {
    render(
      <MemoryRouter>
        <Cities currentCity={currentCity} onChangeCity={jest.fn()} />
      </MemoryRouter>
    );

    const paragraphElement = screen.getByText(currentCity);

    expect(paragraphElement).toBeInTheDocument();
  });
});
