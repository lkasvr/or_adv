import { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Oliveira & Rios Advogados',
    short_name: 'OR Advogados',
    description: process.env.WEBSITE_DESCRIPTION,
    start_url: '/',
    display: 'standalone',
    background_color: '#2c455b',
    theme_color: '#2c455b',
    icons: [
      {
        src: '/favicon.ico',
        sizes: 'any',
        type: 'image/x-icon',
      },
    ],
  };
}
