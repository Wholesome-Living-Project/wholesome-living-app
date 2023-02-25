const { withExpo } = require('@expo/next-adapter')
const withPlugins = require('next-compose-plugins')
const withTM = require('next-transpile-modules')([
  'solito',
  'moti',
  'app',
  'dripsy',
  '@dripsy/core',
])

/** @type {import('next').NextConfig} */
/** @type {import('next').NextConfig} */
const nextConfig = {
  // reanimated (and thus, Moti) doesn't work with strict mode currently...
  // https://github.com/necolas/react-native-web/pull/2330
  // once that gets fixed, set this back to true
  reactStrictMode: false,
  amp: {
    canonicalBase: undefined,
  },
  assetPrefix: undefined,
  i18n: undefined,
  images: {
    path: undefined,
  },
  webpack5: true,
  experimental: {
    forceSwcTransforms: true,
    swcPlugins: [[require.resolve('./plugins/swc_plugin_reanimated.wasm')]],
  },
  compiler: {
    styledComponents: true,
  },
}

module.exports = withPlugins([withTM, withExpo], nextConfig)
