/** @type {import('next').NextConfig} */
const nextConfig = {
  // === ВАЖНО: НАСТРОЙКИ ДЛЯ GitHub Pages ===
  // Базовый путь. Должен совпадать с именем репозитория на GitHub Pages.
  basePath: '/deploy-porftolio-page',
  // Режим статического экспорта для хостинга на GitHub Pages.
  output: 'export',
  // Отключаем оптимизацию картинок Next.js, т.к. она требует серверной части.
  images: {
    unoptimized: true,
  },

  // === СУЩЕСТВУЮЩИЕ НАСТРОЙКИ ИЗ ВАШЕГО ФАЙЛА ===
  reactStrictMode: true,
  trailingSlash: true,
  pageExtensions: ['page.js', 'api.js'],

  webpack(config, { isServer }) {
    // Run custom scripts
    if (isServer) {
      require('./scripts/generate-sitemap');
      require('./scripts/draco');
    }

    // Import `svg` files as React components
    config.module.rules.push({
      test: /\.svg$/,
      resourceQuery: { not: [/url/] },
      use: [{ loader: '@svgr/webpack', options: { svgo: false } }],
    });

    // Import videos, models, hdrs, and fonts
    config.module.rules.push({
      test: /\.(mp4|hdr|glb|woff|woff2)$/i,
      type: 'asset/resource',
    });

    // Force url import with `?url`
    config.module.rules.push({
      resourceQuery: /url/,
      type: 'asset/resource',
    });

    // Import `.glsl` shaders
    config.module.rules.push({
      test: /\.glsl$/,
      type: 'asset/source',
    });

    return config;
  },
};

module.exports = nextConfig;
