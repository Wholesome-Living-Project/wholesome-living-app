import PluginBanner from 'app/components/discover/PluginBanner'
import { Regular } from 'app/theme/typography'
import { FontAwesomeType } from 'app/types/FontAwesome'
import { IonIconType } from 'app/types/IonIcon'
import { MaterialCommunityType } from 'app/types/MaterialCommunity'
import { MaterialIconsType } from 'app/types/MaterialIcons'
import { useRootNavigation } from 'expo-router'
import React from 'react'
import { TouchableOpacity } from 'react-native'
import styled from 'styled-components'

const Container = styled(TouchableOpacity)`
  display: flex;
  flex-direction: column;
`

export type PluginType = {
  title: string
  color?: string
  materialIcon?: MaterialIconsType
  faIcon?: FontAwesomeType
  ionIcon?: IonIconType
  icon?: MaterialCommunityType
}

const Plugin = (plugin: PluginType) => {
  const { title, color, icon, faIcon, materialIcon, ionIcon } = plugin
  const navigation = useRootNavigation()

  return (
    <Container
      onPress={() =>
        navigation?.navigate(
          'plugin' as never,
          {
            color,
            icon,
            faIcon,
            materialIcon,
            ionIcon,
          } as never
        )
      }>
      <PluginBanner {...plugin} size={60} />
      <Regular center>{title}</Regular>
    </Container>
  )
}

export default Plugin
