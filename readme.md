
## 🔥 Configure Firebase and Environment Variables
- Create a new project in the [Firebase console](https://console.firebase.google.com/).
- Add environment variables to `.env` file
  - FIREBASE_API_KEY
  - FIREBASE_AUTH_DOMAIN
  - FIREBASE_PROJECT_ID
  - FIREBASE_STORAGE_BUCKET
  - FIREBASE_MESSAGING_SENDER_ID
  - FIREBASE_APP_ID

- use BACKEND_ENV="DEV" to use local backend, otherwise use BACKEND_ENV="PROD" to use production backend (check api/axios.ts)
- add your CHATGPT_API_KEY to .env file so that the coach works

## 🏁 Start the app
- Install dependencies: `yarn`
- Expo local dev: `yarn start`
  - Runs `expo start`
- Test eslint and tsc: `yarn test`

## 🏗️ Build the app
- `expo run` (or `expo run:ios`, `expo run:android`)
- OR: `run expo prebuild` , which only rebuilds the native code. This is faster than expo run, but you'll need to run expo run before submitting to the app store.
- `eas build --platform ios` (or android)
  - pushes a build to EAS
- `eas submit --platform ios` (or android)
  - submits an EAS build to TestFlight or Play Store
  


## 🗂 Folder layout
- `app` contains the screens
- `api` contains the axios configuration and openapi files
- `src` contains the components, features, helpers, hooks, providers and themes
  
## 🆕 Add new dependencies

### Pure JS dependencies

If you're installing a JavaScript-only dependency:

```sh
yarn add `package-name`
```

### Native dependencies

If you're installing a library with any native code:

```sh
expo install `package-name`
```
--> This makes sure that the library fits with the Expo SDK version you're using. If you're using a library that doesn't have a version for your SDK version, you'll need to upgrade Expo first.
