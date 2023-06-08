import React from 'react'
import { Image, TouchableOpacity } from 'react-native'
import { useNavigation } from 'solito/build/router/use-navigation'
import styled from 'styled-components'
import useHaptics from '../../hooks/useHaptics'
import { COLORS, OUTER_BORDER_RADIUS, SPACING } from '../../theme/theme'
import { Heading4, Regular } from '../../theme/typography'
import { Flex } from '../ui/Flex'

const Padder = styled(Flex)`
  width: 100%;
  position: relative;
  padding: ${SPACING * 2}px;
`

const Container = styled(Flex)`
  height: 100px;
  width: 100%;
  border-radius: ${OUTER_BORDER_RADIUS}px;
  padding: ${SPACING * 2}px;
`

const BackgroundImage = styled(Image)`
  position: absolute;
  height: 100%;
  width: 100%;
  border-radius: ${OUTER_BORDER_RADIUS}px;
`

const AcademyBanner = () => {
  const navigation = useNavigation()
  const { doMediumFeedback } = useHaptics()
  return (
    <TouchableOpacity
      onPress={async () => {
        await doMediumFeedback()
        navigation?.navigate('settings', { screen: 'academy' })
      }}>
      <Padder row justify={'center'} align={'center'}>
        <BackgroundImage source={require('../../../assets/images/academy.jpg')} />
        <Container>
          <Heading4 color={COLORS.WHITE}>Academy</Heading4>
          <Regular color={COLORS.WHITE}>Learn about 3a and Investing</Regular>
        </Container>
      </Padder>
    </TouchableOpacity>
  )
}

export default AcademyBanner
