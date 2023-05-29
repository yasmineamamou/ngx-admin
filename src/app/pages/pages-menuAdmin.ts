import { NbMenuItem  } from '@nebular/theme';
import { icon } from 'leaflet';
export const MENU_ITEMS_Admin: NbMenuItem[] = [
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
    title: 'Employer',
    icon: 'people-outline',
    link: '/pages/Employer',
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
    title: 'Facture',
    icon: 'credit-card-outline',
    link: '/pages/Facture',
  },
];
