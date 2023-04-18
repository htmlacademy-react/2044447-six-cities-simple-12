import { render, screen } from '@testing-library/react';
import PropertyItem from './property-item';
import { MemoryRouter } from 'react-router-dom';

const item = 'shower';

describe('Component: PropertyItem', () => {
  it('should render correctly', () => {
    render(
      <MemoryRouter>
        <PropertyItem item={item} />
      </MemoryRouter>
    );

    const liElement = screen.getByText(item);

    expect(liElement).toBeInTheDocument();
  });
});
