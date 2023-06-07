import { FontAwesome } from '@expo/vector-icons'
import React, { useEffect } from 'react'
import { Image, Platform, TouchableOpacity, View } from 'react-native'
import { Divider } from 'react-native-elements'
import Animated, { useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated'
import { useNavigation } from 'solito/build/router/use-navigation'
import styled from 'styled-components'
import { useUser } from '../../hooks/useUser'
import { COLORS, SPACING } from '../../theme/theme'
import { Heading4 } from '../../theme/typography'
import { Flex } from '../ui/Flex'
import Spacer from '../ui/Spacer'

const Wrapper = styled(Animated.View)`
  width: 100%;
  background: ${COLORS.WHITE};
  padding: ${SPACING * 4}px ${SPACING * 2}px ${SPACING * 2}px;
  position: relative;
  z-index: 2;
  overflow: hidden;
`

const ProfileImage = styled(View)`
  width: 50px;
  height: 50px;
  border-radius: 100px;
  background: ${COLORS.WHITE};
  position: relative;
`

const CompactText = styled(Heading4)`
  margin: 0;
  font-weight: 400;
`

const CompactHeading = styled(Heading4)`
  margin: 0;
`

const AbsoluteImageContainer = styled(View)`
  position: absolute;
  height: 100%;
`

const StyledImage = styled(Image)<{ width: number }>`
  width: 50px;
  height: 100%;
  border-radius: 100px;
`

const TouchableIcon = styled(TouchableOpacity)`
  width: 30px;
  justify-content: center;
  flex-direction: row;
`

type Props = {
  showFull?: boolean
}

const DashboardHeader = ({ showFull }: Props) => {
  const { user } = useUser()
  const navigation = useNavigation()

  const animatedMaxHeight = useSharedValue(180)

  const animatedStyle = useAnimatedStyle(() => {
    return {
      height: animatedMaxHeight.value,
    }
  }, [])

  useEffect(() => {
    if (showFull) {
      animatedMaxHeight.value = withTiming(180, { duration: 150 })
    } else {
      animatedMaxHeight.value = withTiming(100, { duration: 150 })
    }
  }, [animatedMaxHeight, showFull])

  return (
    <Wrapper style={animatedStyle}>
      <Spacer x={Platform.OS === 'android' ? 0 : 4} />
      <Flex row justify={'space-between'}>
        <TouchableIcon onPress={() => navigation?.navigate('settings')}>
          <FontAwesome name={'bars'} size={22} color={COLORS.BLACK} />
        </TouchableIcon>
        <TouchableIcon>
          <FontAwesome name={'bell'} size={22} color={COLORS.BLACK} />
        </TouchableIcon>
      </Flex>
      <Spacer x={2} />
      <Flex row align={'center'}>
        <ProfileImage>
          <AbsoluteImageContainer>
            <StyledImage
              source={require('../../../assets/images/woman_productive_full_size.jpg')}
              width={50}
            />
          </AbsoluteImageContainer>
        </ProfileImage>
        <Spacer x={2} />
        <Flex column>
          <CompactText color={COLORS.BLACK}>Welcome back</CompactText>
          <CompactHeading color={COLORS.BLACK}>
            {user?.firstName} {user?.lastName}
          </CompactHeading>
        </Flex>
      </Flex>
      <Spacer x={2} />
      <Divider orientation={'horizontal'} />
    </Wrapper>
  )
}

export default DashboardHeader
