/** @type {import('next').NextConfig} */
const nextConfig = {
  pageExtensions: ['ts', 'tsx'],
  experimental: {
    appDir: true,
  },
  env: {
    apiPath: 'http://92.125.33.134:3000',
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
