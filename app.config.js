require('dotenv/config')

export default {
  expo: {
    name: 'Wholesome Living',
    slug: 'wholesome-living',
    version: '1.0.3',
    scheme: 'wholesome-living',
    platforms: ['ios', 'android'],
    orientation: 'portrait',
    splash: {
      image: './assets/images/auto-splash.png',
    },
    icon: './icon.png',
    updates: {
      enabled: false,
      url: 'https://u.expo.dev/475aab41-a2c2-4c33-8ec9-608097d85ec1',
    },
    ios: {
      bundleIdentifier: 'com.wholesome-living',
      buildNumber: '1.0.2',
      icon: './icon.png',
    },
    android: {
      package: 'com.wholesomeliving.app',
      versionCode: 5,
      runtimeVersion: {
        policy: 'appVersion',
      },
    },
    extra: {
      FIREBASE_API_KEY: process.env['FIREBASE_API_KEY'],
      FIREBASE_AUTH_DOMAIN: process.env['FIREBASE_AUTH_DOMAIN'],
      FIREBASE_PROJECT_ID: process.env['FIREBASE_PROJECT_ID'],
      FIREBASE_STORAGE_BUCKET: process.env['FIREBASE_STORAGE_BUCKET'],
      FIREBASE_MESSAGING_SENDER_ID: process.env['FIREBASE_MESSAGING_SENDER_ID'],
      FIREBASE_APP_ID: process.env['FIREBASE_APP_ID'],
      GITHUB_ACCESS_TOKEN: process.env['GITHUB_ACCESS_TOKEN'],
      BACKEND_ENV: process.env['BACKEND_ENV'],
      CHATGPT_API_KEY: process.env['CHATGPT_API_KEY'],
      BACKEND_URI: process.env['BACKEND_URI'],
      eas: {
        projectId: '475aab41-a2c2-4c33-8ec9-608097d85ec1',
      },
    },
  },
}
