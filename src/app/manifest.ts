import type { MetadataRoute } from 'next'

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Vibz',
    short_name: 'Vibz',
    description:
      'Crie seu plano de negócio de forma simples e eficaz com Vibz. Ferramentas completas para validar ideias e  transformá-las em realidade.',
    start_url: '/',
    display: 'standalone',
    background_color: '#219ebc',
    theme_color: '#219ebc',
    icons: [
      {
        src: '/static/favicon.ico',
        sizes: '32x32',
        type: 'image/x-icon',
      },
      {
        src: '/static/images/icon-192.png',
        type: 'image/png',
        sizes: '192x192',
      },
      {
        src: '/static/images/icon-512.png',
        type: 'image/png',
        sizes: '512x512',
      },
    ],
  }
}
