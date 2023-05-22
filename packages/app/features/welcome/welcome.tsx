import { signInModalRef, signUpModalRef } from 'app/components/refs/modal-refs'
import Landing from 'app/components/welcome/Landing'
import SignInModal from 'app/components/welcome/SignInModal'
import SignUpModal from 'app/components/welcome/SignUpModal'
import React, { useCallback } from 'react'
import { View } from 'react-native'
import styled from 'styled-components'
import Background from '../../components/ui/Background'
import Button from '../../components/ui/Button'
import Spacer from '../../components/ui/Spacer'

const Footer = styled(View)`
  display: flex;
  align-items: flex-end;
  flex: 1;
  justify-content: flex-end;
`

export function WelcomeScreen() {
  const openSignInModal = useCallback(() => {
    signInModalRef.current?.expand()
  }, [signInModalRef])

  const openSignUpModal = useCallback(() => {
    signUpModalRef.current?.expand()
  }, [signUpModalRef])

  return (
    <Background>
      <Landing />
      <Footer>
        <Button
          fullWidth
          small
          onPress={() => {
            openSignInModal()
          }}>
          Login
        </Button>
        <Spacer x={2} />
        <Button
          fullWidth
          small
          onPress={() => {
            openSignUpModal()
          }}
          buttonType={'secondary'}>
          Register
        </Button>
      </Footer>
      <SignInModal />
      <SignUpModal />
    </Background>
  )
}
