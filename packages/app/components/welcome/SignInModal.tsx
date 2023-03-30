import { signInModalRef } from 'app/components/refs/modal-refs'
import { BottomSheetViewFlex } from 'app/components/ui/BottomSheetViewFlex'
import SigninForm from 'app/components/welcome/SigninForm'
import { useModal } from 'app/hooks/useModal'
import BottomSheet from 'axelra-react-native-bottom-sheet'
import React, { useCallback, useEffect, useState } from 'react'
import { Keyboard, Platform } from 'react-native'

const SignInModal = () => {
  const [modalHeight, setModalHeight] = useState(65)

  const modalProps = useModal({ snapPoints: [`${modalHeight}%`] })

  const onModalClose = useCallback(() => {
    if (Platform.OS === 'ios') {
      Keyboard.dismiss()
    }
  }, [])

  useEffect(() => {
    Keyboard.addListener('keyboardWillShow', () => setModalHeight(80))
    Keyboard.addListener('keyboardWillHide', () => setModalHeight(65))
  }, [])

  return (
    <BottomSheet
      ref={signInModalRef}
      index={-1}
      enablePanDownToClose
      onClose={onModalClose}
      {...modalProps}>
      <BottomSheetViewFlex flex={1} justify={'center'} row>
        <SigninForm />
      </BottomSheetViewFlex>
    </BottomSheet>
  )
}

export default SignInModal
