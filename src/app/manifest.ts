import { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Universal Techno Services',
    short_name: 'UTS',
    description: 'Engineering Industrial Excellence - Premier supplier of Industrial Valves, Agriculture Equipment, and Construction Chemicals.',
    start_url: '/',
    display: 'standalone',
    background_color: '#0f172a',
    theme_color: '#e53935',
    icons: [
      {
        src: '/favicon.ico',
        sizes: 'any',
        type: 'image/x-icon',
      },
    ],
  };
}
