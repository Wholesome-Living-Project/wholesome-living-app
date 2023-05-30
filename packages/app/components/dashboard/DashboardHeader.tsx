import { FontAwesome } from '@expo/vector-icons'
import { Flex } from 'app/components/ui/Flex'
import Spacer from 'app/components/ui/Spacer'
import { useUser } from 'app/hooks/useUser'
import { COLORS, SPACING } from 'app/theme/theme'
import { Heading6, Regular } from 'app/theme/typography'
import React, { forwardRef, useImperativeHandle, useState } from 'react'
import { Platform, View } from 'react-native'
import { useNavigation } from 'solito/build/router/use-navigation'
import styled from 'styled-components'

const Wrapper = styled(View)`
  width: 100%;
  background: ${COLORS.BACKGROUND_GREY};
  border-bottom-left-radius: 20px;
  border-bottom-right-radius: 20px;
  padding: ${SPACING * 4}px ${SPACING * 2}px ${SPACING * 2}px;
  position: relative;
`

const ProfileImage = styled(View)`
  width: 50px;
  height: 50px;
  border-radius: 25px;
  background: ${COLORS.WHITE};
`

const CompactRegular = styled(Regular)`
  margin: 0;
`

type ExposedProps = { height: number }

const DashboardHeader = forwardRef<ExposedProps>((_, ref) => {
  const { user } = useUser()
  const navigation = useNavigation()

  const [height, setHeight] = useState(0)

  useImperativeHandle(
    ref,
    () => {
      return {
        height,
      }
    },
    [height]
  )

  return (
    <Wrapper
      onLayout={({ nativeEvent }) => {
        setHeight(nativeEvent.layout.height)
      }}>
      <Spacer x={Platform.OS === 'android' ? 0 : 4} />
      <Flex row justify={'space-between'}>
        <FontAwesome
          name={'bars'}
          size={22}
          color={COLORS.BLACK}
          onPress={() => navigation?.navigate('settings')}
        />
        <FontAwesome name={'bell'} size={22} color={COLORS.BLACK} />
      </Flex>
      <Spacer x={2} />
      <Flex row align={'center'}>
        <ProfileImage></ProfileImage>
        <Spacer x={2} />
        <Flex column>
          <CompactRegular>Welcome back</CompactRegular>
          <Heading6>
            {user?.firstName} {user?.lastName}
          </Heading6>
        </Flex>
      </Flex>
    </Wrapper>
  )
})

export default DashboardHeader
