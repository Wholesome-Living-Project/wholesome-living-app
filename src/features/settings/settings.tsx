import { FontAwesome, Ionicons } from '@expo/vector-icons'
import React from 'react'
import { Dimensions, FlatList, TouchableOpacity, View } from 'react-native'
import { Divider } from 'react-native-elements'
import { useNavigation } from 'solito/build/router/use-navigation'
import styled from 'styled-components'
import { SafeArea } from '../../components/ui/SafeArea'
import Spacer from '../../components/ui/Spacer'
import { useUser } from '../../hooks/useUser'
import { useAuthentication } from '../../provider/AuthenticationProvider'
import { COLORS, SPACING } from '../../theme/theme'
import { Heading5, Regular } from '../../theme/typography'
import type { IonIconType } from '../../types/IonIcon'

const HORIZONTAL_PADDING = SPACING * 2

const StyledList = styled(FlatList)`
  background-color: ${COLORS.GREY};
`

const ListItem = styled(View)<{ width: number }>`
  display: flex;
  flex-direction: row;
  height: 70px;
  width: ${(p) => p.width}px;
  padding: 0 ${HORIZONTAL_PADDING}px;
  justify-content: space-between;
  align-items: center;
`

const ListItemContent = styled(View)`
  display: flex;
  flex-direction: row;
  align-items: center;
`

const UserProfile = styled(View)<{ width: number }>`
  height: 100px;
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

type SettingsType = {
  name: string
  route?: string
  icon?: IonIconType
}
const SETTINGS: SettingsType[] = [
  { name: 'Personal Information', route: 'personal', icon: 'person-outline' },
  { name: 'Privacy', route: 'privacy', icon: 'lock-closed-outline' },
  { name: 'Security', route: 'security', icon: 'key-outline' },
  { name: 'Academy', route: 'academy', icon: 'school-outline' },
]
export const SettingsScreen = () => {
  const windowWidth = Dimensions.get('window').width
  const { user } = useUser()
  const { signOutUser } = useAuthentication()

  return (
    <SafeArea>
      <StyledList
        data={SETTINGS}
        renderItem={({ item }) => {
          return <Setting {...(item as never as SettingsType)} />
        }}
        ItemSeparatorComponent={() => <Divider width={0.7} color={COLORS.PRIMARY} />}
        ListFooterComponent={
          <>
            <Divider width={0.7} color={COLORS.PRIMARY} />
            <Spacer x={8} />
            <Setting
              name={'Logout'}
              icon={'exit-outline'}
              onPress={async () => {
                await signOutUser()
              }}
            />
          </>
        }
        ListHeaderComponent={() => (
          <UserProfile width={windowWidth}>
            <ProfileImage />
            <Spacer x={2} />
            <UserInfoContainer>
              <EmailText>{user?.email}</EmailText>
              <Spacer x={1} />
              <NameText>{user?.firstName}</NameText>
            </UserInfoContainer>
          </UserProfile>
        )}
      />
    </SafeArea>
  )
}

const Setting = ({ name, route, icon, onPress }: SettingsType & { onPress?: () => void }) => {
  const navigation = useNavigation()
  const windowWidth = Dimensions.get('window').width
  return (
    <TouchableOpacity onPress={onPress ? onPress : () => route && navigation?.navigate(route)}>
      <ListItem width={windowWidth}>
        <ListItemContent>
          {icon && <Ionicons name={icon} size={25} />}
          <Spacer x={2} />
          <Regular>{name}</Regular>
        </ListItemContent>
        {route && <FontAwesome name={'chevron-right'} size={15} />}
      </ListItem>
    </TouchableOpacity>
  )
}
