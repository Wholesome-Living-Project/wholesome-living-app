import { signInModalRef, signUpModalRef } from 'app/components/refs/modal-refs'
import SignInModal from 'app/components/welcome/SignInModal'
import SignUpModal from 'app/components/welcome/SignUpModal'
import { COLORS } from 'app/theme/theme'
import { Heading2 } from 'app/theme/typography'
import { useAssets } from 'expo-asset'
import React, { useCallback, useEffect } from 'react'
import { View } from 'react-native'
import { SvgUri } from 'react-native-svg'
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

const BackgroundWaveContainer = styled(View)`
  position: absolute;
`

export function WelcomeScreen() {
  const openSignInModal = useCallback(() => {
    signInModalRef.current?.expand()
  }, [signInModalRef])

  const openSignUpModal = useCallback(() => {
    signUpModalRef.current?.expand()
  }, [signUpModalRef])

  const [assets, error] = useAssets([
    require('../../../assets/svg/meditate.svg'),
    require('../../../assets/svg/wave.svg'),
  ])

  useEffect(() => {
    if (error) console.log(error)
  }, [error])

  return (
    <Background>
      <BackgroundWaveContainer>
        {assets?.[1] && <SvgUri height={550} width={2000} uri={assets[1].uri} />}
      </BackgroundWaveContainer>
      <Spacer x={30} />
      {assets?.[0] && <SvgUri height={200} uri={assets[0].uri} />}
      <Spacer x={4} />
      <Heading2 color={COLORS.PRIMARY}>Wholesome Living</Heading2>
      <Footer>
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
      </Footer>
      <SignInModal />
      <SignUpModal />
    </Background>
  )
}
