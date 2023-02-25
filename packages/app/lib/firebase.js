import Constants from 'expo-constants'
import { getApps, initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'
import { Platform } from 'react-native'

export const createFirebaseApp = () => {
  const clientCredentials = {
    apiKey:
      Constants?.expoConfig.extra?.FIREBASE_API_KEY ?? process.env['NEXT_PUBLIC_FIREBASE_API_KEY'],
    authDomain:
      Constants?.expoConfig.extra?.FIREBASE_AUTH_DOMAIN ??
      process.env['NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN'],
    projectId:
      Constants?.expoConfig.extra?.FIREBASE_PROJECT_ID ??
      process.env['NEXT_PUBLIC_FIREBASE_PROJECT_ID'],
    storageBucket:
      Constants?.expoConfig.extra?.FIREBASE_STORAGE_BUCKET ??
      process.env['NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET'],
    messagingSenderId:
      Constants?.expoConfig.extra?.FIREBASE_MESSAGING_SENDER_ID ??
      process.env['NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID'],
    appId:
      Constants?.expoConfig.extra?.FIREBASE_APP_ID ?? process.env['NEXT_PUBLIC_FIREBASE_APP_ID'],
  }

  if (getApps().length <= 0) {
    const app = initializeApp(clientCredentials)
    // Check that `window` is in scope for the analytics module!
    if (typeof window !== 'undefined') {
      // Enable analytics. https://firebase.google.com/docs/analytics/get-started
      if ('measurementId' in clientCredentials) {
        getAnalytics()
      }
    }
    return app
  }
}

const app = createFirebaseApp()

let auth
if (Platform.OS !== 'web') {
  const AsyncStorage = require('@react-native-async-storage/async-storage')
  const { getReactNativePersistence, initializeAuth } = require('firebase/auth/react-native')
  auth = initializeAuth(app, { persistence: getReactNativePersistence(AsyncStorage) })
} else {
  auth = getAuth(app)
}

// local storage keys
const UUID_LOCAL_STORAGE_KEY = 'WHOLESOME_LIVING_UUID'

export { auth, UUID_LOCAL_STORAGE_KEY }
