import {
  createUserWithEmailAndPassword,
  deleteUser,
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
    console.log('fetched user: ', user.user.uid)
    return user
  } catch (err) {
    console.log(err)
  }
}

const signUp = async (email: string, password: string) => {
  try {
    const user = await createUserWithEmailAndPassword(auth, email, password)
    console.log('created user: ', user)
    return { data: user, message: 'success' }
  } catch (err: any) {
    return { data: undefined, message: err.message ?? '' }
  }
}

const deleteUserAccount = async () => {
  try {
    const user = auth.currentUser
    if (user) {
      await deleteUser(user)
      return { data: undefined, message: 'success' }
    }
  } catch (err: any) {
    return { data: undefined, message: err.message ?? '' }
  }
}

const onAuthStateChanged = (callback: NextOrObserver<User>) => {
  return onAuthStateChangedFirebase(auth, callback)
}

const getCurrentUser = () => auth.currentUser

export {
  getIsSignedIn,
  signIn,
  signUp,
  signOut,
  onAuthStateChanged,
  getCurrentUser,
  deleteUserAccount,
}
