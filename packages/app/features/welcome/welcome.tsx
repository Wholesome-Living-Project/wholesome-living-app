import { signInModalRef, signUpModalRef } from 'app/components/refs/modal-refs'
import SignInModal from 'app/components/SignInModal'
import SignUpModal from 'app/components/SignUpModal'
import React, { useCallback } from 'react'
import Background from '../../components/Background'
import Button from '../../components/ui/Button'
import Spacer from '../../components/ui/Spacer'

export function WelcomeScreen() {
  const openSignInModal = useCallback(() => {
    signInModalRef.current?.expand()
  }, [signInModalRef])

  const openSignUpModal = useCallback(() => {
    signUpModalRef.current?.expand()
  }, [signUpModalRef])

  return (
    <Background bottom>
      <Spacer x={2} />
      <Spacer x={6} />
      <Button
        fullWidth
        onPress={() => {
          openSignInModal()
        }}>
        Login
      </Button>
      <Spacer x={2} />
      <Button
        fullWidth
        onPress={() => {
          openSignUpModal()
        }}
        buttonType={'secondary'}>
        Register
      </Button>
      <SignInModal />
      <SignUpModal />
    </Background>
  )
}
