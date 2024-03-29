import platform from 'expo-modules-core/src/Platform'
import { useEffect, useState } from 'react'
import { Keyboard } from 'react-native'

// keyboard open/close hook
const UseKeyboard = () => {
  const [keyboardOpen, setKeyboardOpen] = useState(false)
  const [keyboardHeight, setKeyboardHeight] = useState(346)

  useEffect(() => {
    Keyboard.addListener('keyboardWillShow', () => setKeyboardOpen(true))
    Keyboard.addListener('keyboardWillHide', () => setKeyboardOpen(false))
    if (platform.OS === 'android') {
      Keyboard.addListener('keyboardDidShow', () => setKeyboardOpen(true))
      Keyboard.addListener('keyboardDidHide', () => setKeyboardOpen(false))
    }
    Keyboard.addListener('keyboardDidShow', (e) => setKeyboardHeight(e.endCoordinates.height))
  }, [])

  return { keyboardOpen, keyboardHeight }
}

export default UseKeyboard
