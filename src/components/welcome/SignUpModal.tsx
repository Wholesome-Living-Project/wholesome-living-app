import BottomSheet from 'axelra-react-native-bottom-sheet'
import React, { useCallback, useEffect, useState } from 'react'
import { Keyboard, Platform, TouchableOpacity } from 'react-native'
import useKeyboard from '../../hooks/useKeyboard'
import { useModal } from '../../hooks/useModal'
import { signInModalRef, signUpModalRef } from '../refs/modal-refs'
import { BottomSheetViewFlex } from '../ui/BottomSheetViewFlex'
import SignupForm from './SignupForm'
import { Flex } from 'axelra-react-native-flex'
import { Body } from '../../theme/typography'
import { COLORS } from '../../theme/theme'

const SignUpModal = () => {
  const [modalHeight, setModalHeight] = useState(75)
  const { keyboardOpen } = useKeyboard()

  const modalProps = useModal({ snapPoints: [`${modalHeight}%`] })

  const onModalClose = useCallback(() => {
    if (Platform.OS === 'ios') {
      Keyboard.dismiss()
    }
  }, [])

  const openSignInModal = useCallback(() => {
    signUpModalRef.current?.close()
    signInModalRef.current?.expand()
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
      <SignupForm />
      <BottomSheetViewFlex flex={1} justify={'center'} row>
        <Flex row align={'center'}>
          <Body>{`Already have an account?`} </Body>
          <TouchableOpacity onPress={openSignInModal}>
            <Body color={COLORS.CTA}>Sign in</Body>
          </TouchableOpacity>
        </Flex>
      </BottomSheetViewFlex>
    </BottomSheet>
  )
}

export default SignUpModal
