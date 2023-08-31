import { useDimensions } from '@react-native-community/hooks'
import React from 'react'
import { View } from 'react-native'
import styled from 'styled-components'
import { useUser } from '../../hooks/useUser'
import { COLORS, SPACING } from '../../theme/theme'
import { Heading5, Regular } from '../../theme/typography'
import Spacer from './Spacer'
const HORIZONTAL_PADDING = SPACING * 2

const UserProfile = styled(View)<{ width: number }>`
  height: 100px;
  margin-top: ${SPACING * 2}px;
  width: ${(p) => p.width}px;
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 0 ${HORIZONTAL_PADDING}px;
`

const ProfileImage = styled(View)`
  width: 60px;
  height: 60px;
  border-radius: 50px;
  background-color: ${COLORS.PRIMARY};
`

const UserInfoContainer = styled(View)`
  display: flex;
`

const EmailText = styled(Heading5)`
  margin: 0;
`
const NameText = styled(Regular)`
  margin: 0;
`

const UserBanner = () => {
  const { window } = useDimensions()
  const { user } = useUser()
  return (
    <UserProfile width={window.width}>
      <ProfileImage />
      <Spacer x={2} />
      <UserInfoContainer>
        <EmailText>{user?.email}</EmailText>
        <Spacer x={1} />
        <NameText>{user?.firstName}</NameText>
      </UserInfoContainer>
    </UserProfile>
  )
}

export default UserBanner
