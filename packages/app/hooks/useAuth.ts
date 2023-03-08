import { getCurrentUser, onAuthStateChanged } from 'app/auth/auth'
import { useSyncExternalStore } from 'react'

export const useAuth = () => {
  return useSyncExternalStore(onAuthStateChanged, getCurrentUser, () => null)
}
