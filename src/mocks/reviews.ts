import { Review } from '../types/review';

const AVATAR_URL = 'https://i.pravatar.cc/128';

export const reviews: Review[] = [
  {
    'id': 'b67ddfd5-b953-4a30-8c8d-bd783cd6b62a',
    'date': '2019-05-08T14:13:56.569Z',
    'user': {
      'name': 'Oliver Conner',
      'avatarUrl': `${AVATAR_URL}?rnd=${Math.random()}`,
      'isPro': false
    },
    'comment': 'A quiet cozy and picturesque that hides behind a river by the unique lightness of Amsterdam.',
    'rating': 4
  },
  {
    'id': 'r97ttfd5-b953-4a30-8c8d-bd083cd3452a',
    'date': '2019-05-08T14:13:56.569Z',
    'user': {
      'name': 'Max Gorky',
      'avatarUrl': `${AVATAR_URL}?rnd=${Math.random()}`,
      'isPro': true
    },
    'comment': 'An independent House, strategically located between Rembrand Square and National Opera, but where the bustle of the city comes to rest in this alley flowery and colorful.',
    'rating': 4
  },
  {
    'id': 'ty7ddfd5-b953-4a30-8u6d-bd083cd6b62a',
    'date': '2021-01-08T08:55:56.569Z',
    'user': {
      'name': 'DJ List',
      'avatarUrl': `${AVATAR_URL}?rnd=${Math.random()}`,
      'isPro': true
    },
    'comment': 'Perfect',
    'rating': 5
  },
  {
    'id': 'y5t9dfd5-b953-4a30-8c8d-ty364cd6b62a',
    'date': '2023-01-12T04:13:56.569Z',
    'user': {
      'name': 'Alex Nowen',
      'avatarUrl': `${AVATAR_URL}?rnd=${Math.random()}`,
      'isPro': true
    },
    'comment': 'A quiet cozy and picturesque that hides behind a a river by the unique lightness of Amsterdam.',
    'rating': 3
  },
  {
    'id': '6457dfd5-b953-4a30-8c8d-ju673cd6b62a',
    'date': '2022-05-11T14:00:56.569Z',
    'user': {
      'name': 'Queen Elizabeth',
      'avatarUrl': `${AVATAR_URL}?rnd=${Math.random()}`,
      'isPro': false
    },
    'comment': 'Not so good as I would like.',
    'rating': 1
  }
];
