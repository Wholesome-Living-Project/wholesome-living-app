import { getApps, initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'

export const createFirebaseApp = () => {
  const clientCredentials = {
    apiKey: process.env['NEXT_PUBLIC_FIREBASE_API_KEY'],
    authDomain: process.env['NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN'],
    projectId: process.env['NEXT_PUBLIC_FIREBASE_PROJECT_ID'],
    storageBucket: process.env['NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET'],
    messagingSenderId: process.env['NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID'],
    appId: process.env['NEXT_PUBLIC_FIREBASE_APP_ID'],
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

const auth = getAuth(app)

// local storage keys
const UUID_LOCAL_STORAGE_KEY = 'WHOLESOME_LIVING_UUID'

export { UUID_LOCAL_STORAGE_KEY, auth }
