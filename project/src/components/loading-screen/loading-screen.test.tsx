import { render, screen } from '@testing-library/react';
import LoadingScreen from './loading-screen';
import { MemoryRouter } from 'react-router-dom';

describe('Component: LoadingScreen', () => {
  it('should render correctly', () => {
    render(
      <MemoryRouter>
        <LoadingScreen type="big" />
      </MemoryRouter>
    );

    const paragraphElement = screen.getByText('Loading...');

    expect(paragraphElement).toBeInTheDocument();
  });
});
