// partners-data.ts
import { Partner } from './partners-section';

export const partners: Partner[] = [
  {
    name: 'CMA Marketing',
    logoUrl: '/logo.png',
    socials: [
      { platform: 'instagram', url: 'https://www.instagram.com/cma_marketing1/' },
      { platform: 'facebook', url: 'https://www.facebook.com/cma.marketing1' },
    ],
  },
  {
    name: 'M. Mahmoud Aluminium',
    socials: [
      { platform: 'instagram', url: 'https://www.instagram.com/m.mahmoud_for_aluminium/' },
    ],
  },
  {
    name: 'Gera Resale',
    socials: [
      { platform: 'instagram', url: 'https://www.instagram.com/geraresale_/' },
      { platform: 'facebook', url: 'https://www.facebook.com/GeraResale/' },
    ],
  },
  {
    name: 'Barca Glass',
    socials: [
      { platform: 'instagram', url: 'https://www.instagram.com/barca_.glass/' },
      { platform: 'facebook', url: 'https://www.facebook.com/barcaglass' },
    ],
  },
  // Add more partners as needed
];
