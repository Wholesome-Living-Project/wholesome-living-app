import { signUpModalRef } from 'app/components/refs/modal-refs'
import SignupForm from 'app/components/SignupForm'
import { BottomSheetViewFlex } from 'app/components/ui/BottomSheetViewFlex'
import { useModal } from 'app/hooks/useModal'
import BottomSheet from 'axelra-react-native-bottom-sheet'
import React, { useCallback, useEffect, useState } from 'react'
import { Keyboard, Platform } from 'react-native'

const SignUpModal = () => {
  const [modalHeight, setModalHeight] = useState(55)

  const modalProps = useModal({ snapPoints: [`${modalHeight}%`] })

  const onModalClose = useCallback(() => {
    if (Platform.OS === 'ios') {
      Keyboard.dismiss()
    }
  }, [])

  useEffect(() => {
    Keyboard.addListener('keyboardWillShow', () => setModalHeight(80))
    Keyboard.addListener('keyboardWillHide', () => setModalHeight(55))
  }, [])

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
