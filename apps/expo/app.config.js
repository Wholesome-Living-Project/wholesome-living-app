require('dotenv/config')

export default {
  expo: {
    name: 'wholesome-living',
    slug: 'wholesome-living',
    version: '0.0.1',
    scheme: 'wholesome-living',
    platforms: ['ios', 'android'],
    ios: {
      bundleIdentifier: 'com.wholesome-living',
    },
    extra: {
      FIREBASE_API_KEY: process.env['FIREBASE_API_KEY'],
      FIREBASE_AUTH_DOMAIN: process.env['FIREBASE_AUTH_DOMAIN'],
      FIREBASE_PROJECT_ID: process.env['FIREBASE_PROJECT_ID'],
      FIREBASE_STORAGE_BUCKET: process.env['FIREBASE_STORAGE_BUCKET'],
      FIREBASE_MESSAGING_SENDER_ID: process.env['FIREBASE_MESSAGING_SENDER_ID'],
      FIREBASE_APP_ID: process.env['FIREBASE_APP_ID'],
      GITHUB_ACCESS_TOKEN: process.env['GITHUB_ACCESS_TOKEN'],
    },
  },
}
