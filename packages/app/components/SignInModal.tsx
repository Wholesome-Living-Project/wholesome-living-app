import LoginForm from 'app/components/LoginForm'
import { signInModalRef } from 'app/components/refs/modal-refs'
import { BottomSheetViewFlex } from 'app/components/ui/BottomSheetViewFlex'
import { useModal } from 'app/hooks/useModal'
import BottomSheet from 'axelra-react-native-bottom-sheet'
import React, { useCallback } from 'react'
import { Keyboard, Platform } from 'react-native'

const SignInModal = () => {
  const modalProps = useModal({ snapPoints: ['80%'] })

  const onModalClose = useCallback(() => {
    if (Platform.OS === 'ios') {
      Keyboard.dismiss()
    }
  }, [])

  return (
    <BottomSheet
      ref={signInModalRef}
      index={-1}
      enablePanDownToClose
      onClose={onModalClose}
      {...modalProps}>
      <BottomSheetViewFlex flex={1} justify={'center'} row>
        <LoginForm />
      </BottomSheetViewFlex>
    </BottomSheet>
  )
}

export default SignInModal
