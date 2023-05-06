import { NbMenuItem } from '@nebular/theme';

export const MENU_ITEMS: NbMenuItem[] = [
  {
    title: 'IoT Dashboard',
    icon: 'home-outline',
    link: '/pages/iot-dashboard',
  },
  {
    title: 'FEATURES',
    group: true,
  },
  {
    title: 'Type de société',
    icon: 'cube-outline',
    link: '/pages/Type',
  },
  {
    title: 'Société',
    icon: 'briefcase-outline',
    link: '/pages/Societe',
  },
  {
    title: 'Département',
    icon: 'home-outline',
    link: '/pages/Departement',
  },
  {
    title: 'Compte',
    icon: 'people-outline',
    link: '/pages/Compte',
  },
  {
    title: 'Taches',
    icon: 'list-outline',
    link: '/pages/Tache',
  },
  {
    title: 'Projets',
    icon: 'browser-outline',
    link: '/pages/Projet',
  },
  {
    title: 'Miscellaneous',
    icon: 'shuffle-2-outline',
    children: [
      {
        title: '404',
        link: '/pages/miscellaneous/404',
      },
    ],
  },
  {
    title: 'Auth',
    icon: 'lock-outline',
    children: [
      {
        title: 'Login',
        link: '/auth/login',
      },
      {
        title: 'Register',
        link: '/auth/register',
      },
      {
        title: 'Request Password',
        link: '/auth/request-password',
      },
      {
        title: 'Reset Password',
        link: '/auth/reset-password',
      },
    ],
  },
];
