import dayjs from 'dayjs';
import { SortingTypes } from '../const/const';
import { Offer } from '../types/offer';
import { Review } from '../types/review';

export const getRatingColor = (rating: number) =>
  (Math.round(rating) * 100) / 5;

export const humanizeDate = (date: string, format: string) =>
  dayjs(date).format(format);

export const getSortingOffers = (offers: Offer[], activeSort: string) => {
  const sortingOffers = offers.slice();

  switch (activeSort) {
    case SortingTypes[1]:
      return sortingOffers.sort((a: Offer, b: Offer) => a.price - b.price);
    case SortingTypes[2]:
      return sortingOffers.sort((a: Offer, b: Offer) => b.price - a.price);
    case SortingTypes[3]:
      return sortingOffers.sort((a: Offer, b: Offer) => b.rating - a.rating);
    default:
      return sortingOffers;
  }
};

export const getSortingComments = (a: Review, b: Review) =>
  dayjs(b.date).diff(dayjs(a.date));

export const getRandomCity = (cities: string[]) =>
  cities[Math.floor(Math.random() * cities.length)];
