import React from 'react'
import { Image, View } from 'react-native'
import styled from 'styled-components'
import { useUser } from '../../hooks/useUser'
import { COLORS, SPACING } from '../../theme/theme'
import { Heading4, Heading6 } from '../../theme/typography'
import { Flex } from '../ui/Flex'
import Spacer from '../ui/Spacer'

const CompactText = styled(Heading6)`
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

const ProfileImage = styled(View)`
  width: 50px;
  height: 50px;
  border-radius: 100px;
  background: ${COLORS.WHITE};
  position: relative;
`

const Container = styled(Flex)`
  width: 100%;
  padding: 0 ${SPACING * 2}px;
`

const Divider = styled(Flex)`
  height: 1px;
  width: 100%;
  background: ${COLORS.BACKGROUND_GREY};
`

const WelcomeHeader = () => {
  const { user } = useUser()
  return (
    <>
      <Container row align={'center'}>
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
      </Container>
      <Spacer x={2} />
      <Divider />
    </>
  )
}

export default WelcomeHeader
