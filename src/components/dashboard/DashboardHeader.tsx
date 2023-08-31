import { FontAwesome } from '@expo/vector-icons'
import { alpha } from 'axelra-react-native-utilities'
import React from 'react'
import { Image, Platform, TouchableOpacity, View } from 'react-native'
import { useNavigation } from 'solito/build/router/use-navigation'
import styled from 'styled-components'
import { COLORS, SPACING } from '../../theme/theme'
import { Flex } from '../ui/Flex'
import Spacer from '../ui/Spacer'

const Wrapper = styled(View)`
  width: 100%;
  height: 110px;
  background: ${alpha(0.1, COLORS.GREY)};
  position: relative;
  z-index: 2;
  overflow: hidden;
`

const Container = styled(Flex)`
  padding: ${SPACING * 4}px ${SPACING * 2}px;
`

const Logo = styled(Image)`
  width: 200px;
  height: 45px;
`

const TouchableIcon = styled(TouchableOpacity)`
  width: 30px;
  justify-content: center;
  flex-direction: row;
`

type Props = {
  showFull?: boolean
}

const DashboardHeader = () => {
  const navigation = useNavigation()

  return (
    <Wrapper>
      <Spacer x={Platform.OS === 'android' ? 0 : 3} />
      <Container>
        <Flex row justify={'space-between'} align={'center'}>
          <TouchableIcon onPress={() => navigation?.navigate('settings')}>
            <FontAwesome name={'bars'} size={22} color={COLORS.BLACK} />
          </TouchableIcon>
          <Logo source={require('../../../assets/images/logo.png')} resizeMode={'contain'} />
          <TouchableIcon onPress={() => navigation?.navigate('notifications')}>
            <FontAwesome name={'bell'} size={22} color={COLORS.BLACK} />
          </TouchableIcon>
        </Flex>
      </Container>
    </Wrapper>
  )
}

export default DashboardHeader
