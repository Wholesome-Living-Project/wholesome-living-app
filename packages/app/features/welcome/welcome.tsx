import { signInModalRef } from 'app/components/refs/modal-refs'
import Landing from 'app/components/welcome/Landing'
import SignInModal from 'app/components/welcome/SignInModal'
import SignUpModal from 'app/components/welcome/SignUpModal'
import { COLORS } from 'app/theme/theme'
import { Heading5 } from 'app/theme/typography'
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
  }, [])

  return (
    <Background horizontalCenter>
      <Landing />
      <Footer>
        <Button
          buttonType={'primary'}
          fullWidth
          onPress={() => {
            openSignInModal()
          }}>
          <Heading5 color={COLORS.SECONDARY}>Start living</Heading5> wholesome
        </Button>
        <Spacer x={3} />
      </Footer>
      <SignInModal />
      <SignUpModal />
    </Background>
  )
}
