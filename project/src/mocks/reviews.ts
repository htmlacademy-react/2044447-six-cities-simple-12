import { Review } from '../types/review';

export const reviews: Review[] = [
  {
    comment:
      'sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit',
    date: 'Sun Mar 05 2020 09:56:10 GMT+0300 (Москва, стандартное время)',
    id: 1,
    rating: 4,
    user: {
      avatarUrl: 'img/avatar-angelina.jpg',
      id: 1,
      isPro: false,
      name: 'Oliver.conner',
    },
  },
  {
    comment: 'But I must explain to you how all this mistaken.',
    date: 'Mon Apr 10 2019 09:56:10 GMT+0300 (Москва, стандартное время)',
    id: 1,
    rating: 5,
    user: {
      avatarUrl: 'img/avatar-angelina.jpg',
      id: 1,
      isPro: true,
      name: 'Mayo.cub',
    },
  },
  {
    comment:
      'Nor again is there anyone who loves or pursues or desires to obtain pain of itself.',
    date: 'Thu Oct 28 2021 09:56:10 GMT+0300 (Москва, стандартное время)',
    id: 1,
    rating: 3,
    user: {
      avatarUrl: 'img/avatar-angelina.jpg',
      id: 1,
      isPro: false,
      name: 'Leo.corner',
    },
  },
  {
    comment:
      'A quiet cozy and picturesque that hides behind a a river by the unique lightness of Amsterdam.',
    date: 'Fri Aug 23 2020 09:56:10 GMT+0300 (Москва, стандартное время)',
    id: 1,
    rating: 5,
    user: {
      avatarUrl: 'img/avatar-angelina.jpg',
      id: 1,
      isPro: true,
      name: 'Anna.kim',
    },
  },
];
