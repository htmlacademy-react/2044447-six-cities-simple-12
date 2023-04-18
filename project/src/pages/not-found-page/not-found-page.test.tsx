import { render, screen } from '@testing-library/react';
import { HelmetProvider } from 'react-helmet-async';
import NotFound from './not-found-page';
import { MemoryRouter } from 'react-router-dom';

describe('Page: NotFoundScreen', () => {
  it('should render correctly', () => {
    render(
      <MemoryRouter>
        <HelmetProvider>
          <NotFound />
        </HelmetProvider>
      </MemoryRouter>
    );

    const paragraphElement = screen.getByText('Unfortunately, nothing found');
    const linkElement = screen.getByText('Click to return to home');

    expect(paragraphElement).toBeInTheDocument();
    expect(linkElement).toBeInTheDocument();
  });
});
