export const getRatingColor = (rating: number) =>
  (Math.round(rating) * 100) / 5;
