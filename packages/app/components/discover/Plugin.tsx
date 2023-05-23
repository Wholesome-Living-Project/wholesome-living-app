import PluginBanner from 'app/components/discover/PluginBanner'
import { PluginType } from 'app/helpers/pluginList'
import { Regular } from 'app/theme/typography'
import { useRootNavigation } from 'expo-router'
import React from 'react'
import { TouchableOpacity } from 'react-native'
import styled from 'styled-components'

const Container = styled(TouchableOpacity)`
  display: flex;
  flex-direction: column;
`

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
