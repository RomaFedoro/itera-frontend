/** @type {import('next').NextConfig} */
const nextConfig = {
  pageExtensions: ['ts', 'tsx'],
  experimental: {
    appDir: true,
  },
  env: {
    apiPath: 'https://forma-web.ru/api',
  },
  
  async redirects() {
    return [
      {
        source: '/',
        destination: '/today',
        permanent: true,
      },
      {
        source: '/auth',
        destination: '/auth/login',
        permanent: true,
      },
    ];
  },
};

module.exports = nextConfig;
