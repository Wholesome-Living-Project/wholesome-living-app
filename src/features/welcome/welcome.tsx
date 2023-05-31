import React, { useCallback } from 'react'
import { View } from 'react-native'
import styled from 'styled-components'
import { signInModalRef } from '../../components/refs/modal-refs'
import Background from '../../components/ui/Background'
import Button from '../../components/ui/Button'
import Spacer from '../../components/ui/Spacer'
import Landing from '../../components/welcome/Landing'
import SignInModal from '../../components/welcome/SignInModal'
import SignUpModal from '../../components/welcome/SignUpModal'
import { COLORS } from '../../theme/theme'
import { Heading5 } from '../../theme/typography'

const Footer = styled(View)`
  display: flex;
  align-items: flex-end;
  flex: 1;
  justify-content: flex-end;
`

function WelcomeScreen() {
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

export default WelcomeScreen
