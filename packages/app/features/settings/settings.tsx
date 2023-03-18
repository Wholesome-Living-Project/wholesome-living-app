import { FontAwesome, Ionicons } from '@expo/vector-icons'
import { signOut } from 'app/auth/auth'
import { SafeAreaBackground } from 'app/components/SafeAreaBackground'
import Spacer from 'app/components/ui/Spacer'
import { useAuth } from 'app/hooks/useAuth'
import { COLORS, SPACING } from 'app/theme/theme'
import { Heading5, Regular } from 'app/theme/typography'
import type { IonIconType } from 'app/types/IonIcon'
import React from 'react'
import { Dimensions, FlatList, TouchableOpacity, View } from 'react-native'
import { Divider } from 'react-native-elements'
import { useNavigation } from 'solito/build/router/use-navigation'
import styled from 'styled-components'

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
]
export const SettingsScreen = () => {
  const windowWidth = Dimensions.get('window').width
  const user = useAuth()

  return (
    <SafeAreaBackground>
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
                await signOut().catch((err) => console.log(err))
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
              <NameText>name</NameText>
            </UserInfoContainer>
          </UserProfile>
        )}
      />
    </SafeAreaBackground>
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
