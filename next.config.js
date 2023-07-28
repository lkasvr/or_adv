/** @type {import('next').NextConfig} */
const nextConfig = {
productionBrowserSourceMaps: true,
  // webpack: (config, { dev, isServer }) => {

  //     config.optimization.minimize = false;

  //   return config;
  // },
}

module.exports = nextConfig
