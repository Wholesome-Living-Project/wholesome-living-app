import BottomSheet from 'axelra-react-native-bottom-sheet'
import React, { useCallback, useEffect, useState } from 'react'
import { Keyboard, Platform } from 'react-native'
import useKeyboard from '../../hooks/useKeyboard'
import { useModal } from '../../hooks/useModal'
import { signUpModalRef } from '../refs/modal-refs'
import { BottomSheetViewFlex } from '../ui/BottomSheetViewFlex'
import SignupForm from './SignupForm'

const SignUpModal = () => {
  const [modalHeight, setModalHeight] = useState(75)
  const { keyboardOpen } = useKeyboard()

  const modalProps = useModal({ snapPoints: [`${modalHeight}%`] })

  const onModalClose = useCallback(() => {
    if (Platform.OS === 'ios') {
      Keyboard.dismiss()
    }
  }, [])

  useEffect(() => {
    if (keyboardOpen) {
      setModalHeight(85)
    } else {
      setModalHeight(75)
    }
  }, [keyboardOpen])

  return (
    <BottomSheet
      ref={signUpModalRef}
      index={-1}
      enablePanDownToClose
      onClose={onModalClose}
      {...modalProps}>
      <BottomSheetViewFlex flex={1} justify={'center'} row>
        <SignupForm />
      </BottomSheetViewFlex>
    </BottomSheet>
  )
}

export default SignUpModal
