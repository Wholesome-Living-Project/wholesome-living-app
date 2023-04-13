import {
  createUserWithEmailAndPassword,
  NextOrObserver,
  onAuthStateChanged as onAuthStateChangedFirebase,
  signInWithEmailAndPassword,
  User,
} from 'firebase/auth'
import { auth } from '../lib/firebase'

const getIsSignedIn = () => Boolean(auth.currentUser)

const signOut = () => auth.signOut()

const signIn = async (email: string, password: string) => {
  try {
    const user = await signInWithEmailAndPassword(auth, email, password)
    console.log(user)
    return user
  } catch (err) {
    console.log(err)
  }
}

const signUp = async (email: string, password: string) =>
  createUserWithEmailAndPassword(auth, email, password)
    .then((user) => {
      return user
    })
    .catch((err) => {
      console.log(err)
    })

const onAuthStateChanged = (callback: NextOrObserver<User>) => {
  return onAuthStateChangedFirebase(auth, callback)
}

const getCurrentUser = () => auth.currentUser

export { getIsSignedIn, signIn, signUp, signOut, onAuthStateChanged, getCurrentUser }
