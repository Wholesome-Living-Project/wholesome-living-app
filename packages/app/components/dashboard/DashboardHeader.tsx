import { FontAwesome } from '@expo/vector-icons'
import { Flex } from 'app/components/ui/Flex'
import Spacer from 'app/components/ui/Spacer'
import { useUser } from 'app/hooks/useUser'
import { COLORS, SPACING } from 'app/theme/theme'
import { Heading4, Label } from 'app/theme/typography'
import React, { forwardRef, useEffect, useImperativeHandle, useState } from 'react'
import { Image, Platform, View } from 'react-native'
import { useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated'
import { useNavigation } from 'solito/build/router/use-navigation'
import styled from 'styled-components'

const Wrapper = styled(View)`
  width: 100%;
  background: ${COLORS.PRIMARY};
  border-bottom-left-radius: 20px;
  border-bottom-right-radius: 20px;
  padding: ${SPACING * 4}px ${SPACING * 2}px ${SPACING * 2}px;
  position: relative;
  overflow: hidden;
`

const ProfileImage = styled(View)`
  width: 50px;
  height: 50px;
  border-radius: 100px;
  background: ${COLORS.WHITE};
  position: relative;
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

type ExposedProps = { height: number }

type Props = {
  showFull?: boolean
}

const DashboardHeader = forwardRef<ExposedProps, Props>(({ showFull }, ref) => {
  const { user } = useUser()
  const navigation = useNavigation()

  const [height, setHeight] = useState(0)

  const animatedMaxHeight = useSharedValue(250)

  const animatedStyle = useAnimatedStyle(() => {
    return {
      maxHeight: animatedMaxHeight.value,
    }
  }, [])

  useImperativeHandle(
    ref,
    () => {
      return {
        height,
      }
    },
    [height]
  )

  useEffect(() => {
    if (showFull) {
      animatedMaxHeight.value = withTiming(250, { duration: 300 })
    } else {
      animatedMaxHeight.value = withTiming(100, { duration: 300 })
    }
  }, [animatedMaxHeight, showFull])

  return (
    <Wrapper
      onLayout={({ nativeEvent }) => {
        setHeight(nativeEvent.layout.height)
      }}
      style={animatedStyle}>
      <Spacer x={Platform.OS === 'android' ? 0 : 4} />
      <Flex row justify={'space-between'}>
        <FontAwesome
          name={'bars'}
          size={22}
          color={COLORS.WHITE}
          onPress={() => navigation?.navigate('settings')}
        />
        <FontAwesome name={'bell'} size={22} color={COLORS.WHITE} />
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
          <CompactHeading color={COLORS.WHITE}>Welcome back</CompactHeading>
          <Label color={COLORS.WHITE}>
            {user?.firstName} {user?.lastName}
          </Label>
        </Flex>
      </Flex>
    </Wrapper>
  )
})

export default DashboardHeader
