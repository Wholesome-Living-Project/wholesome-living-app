import { useSyncExternalStore } from 'react'
import { getCurrentUser, onAuthStateChanged } from '../auth/auth'

export const useAuth = () => {
  return useSyncExternalStore(onAuthStateChanged, getCurrentUser, () => null)
}
