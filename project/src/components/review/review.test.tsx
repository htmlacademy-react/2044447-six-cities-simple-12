import { render, screen } from '@testing-library/react';
import { makeFakeReview } from '../../mocks/mocks';
import ReviewItem from './review';

const reviewIncoming = makeFakeReview();
const { comment, user } = reviewIncoming;
user.isPro = true;

describe('Component: ReviewItem', () => {
  it('should render correctly & update user review', () => {
    render(<ReviewItem review={reviewIncoming} />);

    expect(screen.getByText(comment)).toBeInTheDocument();
    expect(screen.getByText(user.name)).toBeInTheDocument();
  });
});
