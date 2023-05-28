import { signUpModalRef } from 'app/components/refs/modal-refs'
import { BottomSheetViewFlex } from 'app/components/ui/BottomSheetViewFlex'
import SignupForm from 'app/components/welcome/SignupForm'
import useKeyboard from 'app/hooks/useKeyboard'
import { useModal } from 'app/hooks/useModal'
import BottomSheet from 'axelra-react-native-bottom-sheet'
import React, { useCallback, useEffect, useState } from 'react'
import { Keyboard, Platform } from 'react-native'

const SignUpModal = () => {
  const [modalHeight, setModalHeight] = useState(50)
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
      setModalHeight(50)
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
