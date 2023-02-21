import {
  HomeIcon,
  PlusIcon,
  Square2StackIcon,
  UserIcon,
} from '@heroicons/react/24/solid';
import { TMenuLink } from './types';

export const menuLinks: TMenuLink[] = [
  {
    link: '/today',
    title: 'Сегодня',
    Icon: HomeIcon,
  },
  {
    link: '/habits',
    title: 'Все привычки',
    Icon: Square2StackIcon,
  },
  {
    link: '/create',
    title: 'Создать привычку',
    Icon: PlusIcon,
  },
];

export const accountLink: TMenuLink = {
  link: '/account',
  title: 'Личный кабинет',
  Icon: UserIcon,
};
