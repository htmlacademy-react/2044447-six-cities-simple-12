import { render, screen } from '@testing-library/react';

import PropertyImage from './property-image';
import { datatype } from 'faker';
import { MemoryRouter } from 'react-router-dom';

const img = datatype.string();

describe('Component: PropertyItem', () => {
  it('should render correctly', () => {
    render(
      <MemoryRouter>
        <PropertyImage img={img} />
      </MemoryRouter>
    );

    const altElement = screen.getByAltText('Photo studio');

    expect(altElement).toBeInTheDocument();
  });
});
