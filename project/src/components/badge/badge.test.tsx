import { render, screen } from '@testing-library/react';
import Badge from './badge';
import { MemoryRouter } from 'react-router-dom';

const className = 'place-card__mark';

describe('Component: Badge', () => {
  it('should render correctly', () => {
    render(
      <MemoryRouter>
        <Badge className={className} />
      </MemoryRouter>
    );

    const paragraphElement = screen.getByText('Premium');

    expect(paragraphElement).toBeInTheDocument();
  });
});
