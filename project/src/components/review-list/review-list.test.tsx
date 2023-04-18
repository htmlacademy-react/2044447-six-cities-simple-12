import { render, screen } from '@testing-library/react';
import { makeFakeReviews } from '../../mocks/mocks';
import ReviewList from './review-list';

const reviews = makeFakeReviews();

describe('Component: ReviewsList', () => {
  it('should render correctly', () => {
    render(<ReviewList comments={reviews} />);

    expect(screen.getAllByTestId('reviewItem').length).toBe(reviews.length);
  });
});
