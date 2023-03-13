import dayjs from 'dayjs';

export const getRatingColor = (rating: number) =>
  (Math.round(rating) * 100) / 5;

export const humanizeDate = (date: string, format: string) =>
  dayjs(date).format(format);
