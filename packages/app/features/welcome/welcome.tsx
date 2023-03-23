import { signInModalRef } from 'app/components/refs/modal-refs'
import SignInModal from 'app/components/SignInModal'
import React, { useCallback, useState } from 'react'
import Background from '../../components/Background'
import Button from '../../components/ui/Button'
import Spacer from '../../components/ui/Spacer'

export function WelcomeScreen() {
  const [formType, setFormType] = useState('login')
  const openSignInModal = useCallback(() => {
    signInModalRef.current?.expand()
  }, [signInModalRef])
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
          setFormType('register')
        }}
        buttonType={'secondary'}>
        Register
      </Button>
      <SignInModal />
    </Background>
  )
}
