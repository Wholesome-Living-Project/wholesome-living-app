import { Redirect } from 'expo-router'
import React, { useCallback } from 'react'
import { View } from 'react-native'
import styled from 'styled-components'
import { useSplashShowing } from '../../../app/_layout'
import { signInModalRef } from '../../components/refs/modal-refs'
import Background from '../../components/ui/Background'
import Button from '../../components/ui/Button'
import { CustomSplash } from '../../components/ui/CustomSplash'
import Spacer from '../../components/ui/Spacer'
import Landing from '../../components/welcome/Landing'
import SignInModal from '../../components/welcome/SignInModal'
import SignUpModal from '../../components/welcome/SignUpModal'
import { useUser } from '../../hooks/useUser'
import { useOnboarding } from '../../provider/OnboardingProvider'
import { COLORS } from '../../theme/theme'

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
  const { chosenPlugins, loading } = useOnboarding()

  const { user } = useUser()

  const splashShowing = useSplashShowing()

  if (splashShowing) return <CustomSplash />

  if (user?.firebaseUID && !loading) {
    return chosenPlugins.length > 0 ? (
      <Redirect href={'root'} />
    ) : (
      <Redirect href={'(onboarding)'} />
    )
  }

  return (
    <Background horizontalCenter>
      <Landing />
      <Footer>
        <Button
          buttonType={'cta'}
          fullWidth
          color={COLORS.WHITE}
          onPress={() => {
            openSignInModal()
          }}>
          Start your journey
        </Button>
        <Spacer x={7} />
      </Footer>
      <SignInModal />
      <SignUpModal />
    </Background>
  )
}

export default WelcomeScreen
