import PluginBanner from 'app/components/PluginBanner'
import { Regular } from 'app/theme/typography'
import { FontAwesomeType } from 'app/types/FontAwesome'
import { IonIconType } from 'app/types/IonIcon'
import { MaterialCommunityType } from 'app/types/MaterialCommunity'
import { MaterialIconsType } from 'app/types/MaterialIcons'
import React from 'react'
import { TouchableOpacity } from 'react-native'
import { useRouter } from 'solito/router'
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
  const router = useRouter()
  return (
    <Container
      onPress={() =>
        router.push({
          pathname: `/plugin/${title}`,
          query: { color, icon, faIcon, materialIcon, ionIcon },
        })
      }>
      <PluginBanner {...plugin} size={60} />
      <Regular center>{title}</Regular>
    </Container>
  )
}

export default Plugin
