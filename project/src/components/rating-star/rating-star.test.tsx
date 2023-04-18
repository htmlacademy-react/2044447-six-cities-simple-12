import { render, screen } from '@testing-library/react';
import RatingStar from './rating-star';
import { MemoryRouter } from 'react-router-dom';

const value = 3;
describe('Component: RatingStar', () => {
  it('should render correctly', () => {
    render(
      <MemoryRouter>
        <RatingStar value={value} title={'text'} onChangeData={jest.fn()} />
      </MemoryRouter>
    );

    const valueElement = screen.getByDisplayValue(`${value}`);

    expect(valueElement).toBeInTheDocument();
  });
});
