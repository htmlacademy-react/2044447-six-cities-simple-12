import { render, screen } from '@testing-library/react';
import MainEmpty from './main-empty';
import { MemoryRouter } from 'react-router-dom';

describe('Component: MainEmpty', () => {
  it('should render correctly', () => {
    render(
      <MemoryRouter>
        <MainEmpty city="Paris" />
      </MemoryRouter>
    );

    const paragraphElement = screen.getByText('No places to stay available');

    expect(paragraphElement).toBeInTheDocument();
  });
});
