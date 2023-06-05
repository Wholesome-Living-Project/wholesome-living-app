import BottomSheet from 'axelra-react-native-bottom-sheet'
import { Flex } from 'axelra-react-native-flex'
import React, { useCallback, useEffect, useState } from 'react'
import { Keyboard, Platform, TouchableOpacity } from 'react-native'
import useKeyboard from '../../hooks/useKeyboard'
import { useModal } from '../../hooks/useModal'
import { COLORS } from '../../theme/theme'
import { Body } from '../../theme/typography'
import { signInModalRef, signUpModalRef } from '../refs/modal-refs'
import { BottomSheetViewFlex } from '../ui/BottomSheetViewFlex'
import KeyboardCloseHandleComponent from '../ui/KeyboardCloseHandleComponent'
import SigninForm from './SigninForm'

const SignInModal = () => {
  const [modalHeight, setModalHeight] = useState(60)

  const modalProps = useModal({ snapPoints: [`${modalHeight}%`] })

  const { keyboardOpen } = useKeyboard()

  const onModalClose = useCallback(() => {
    if (Platform.OS === 'ios') {
      Keyboard.dismiss()
    }
  }, [])

  const openSignUpModal = useCallback(() => {
    signInModalRef.current?.close()
    signUpModalRef.current?.expand()
  }, [])

  useEffect(() => {
    if (keyboardOpen) {
      setModalHeight(80)
    } else {
      setModalHeight(60)
    }
  }, [keyboardOpen])

  return (
    <BottomSheet
      ref={signInModalRef}
      index={-1}
      enablePanDownToClose
      onClose={onModalClose}
      {...modalProps}>
      <KeyboardCloseHandleComponent>
        <SigninForm />
        <BottomSheetViewFlex flex={1} align={'center'}>
          <Flex row align={'center'}>
            <Body>{`Don't have an account?`} </Body>
            <TouchableOpacity onPress={openSignUpModal}>
              <Body color={COLORS.CTA}>Sign up</Body>
            </TouchableOpacity>
          </Flex>
        </BottomSheetViewFlex>
      </KeyboardCloseHandleComponent>
    </BottomSheet>
  )
}

export default SignInModal
