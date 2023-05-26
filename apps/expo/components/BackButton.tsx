import { FontAwesome } from '@expo/vector-icons'
import Spacer from 'app/components/ui/Spacer'
import { COLORS } from 'app/theme/theme'
import { Heading6 } from 'app/theme/typography'
import { useRootNavigation } from 'expo-router'
import React from 'react'
import { TouchableOpacity } from 'react-native'
import styled from 'styled-components'

const BackButtonContainer = styled(TouchableOpacity)`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
`

type Props = {
  color?: string
  size?: 'sm' | 'md' | 'lg'
}

const BackButton = ({ color, size }: Props) => {
  const navigation = useRootNavigation()

  // if (!navigation?.canGoBack) return null

  return (
    <BackButtonContainer
      onPress={() => {
        navigation?.goBack()
      }}>
      <FontAwesome
        color={color ?? COLORS.PRIMARY}
        name={'chevron-left'}
        size={size === 'sm' ? 15 : size === 'md' ? 18 : size === 'lg' ? 22 : 15}
      />
      <Spacer x={1} />
      <Heading6 color={color ?? COLORS.PRIMARY}>back</Heading6>
    </BackButtonContainer>
  )
}

export default BackButton
