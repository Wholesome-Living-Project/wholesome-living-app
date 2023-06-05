import { useRootNavigation } from 'expo-router'
import React from 'react'
import { TouchableOpacity } from 'react-native'
import styled from 'styled-components'
import { PluginType } from '../../helpers/pluginList'
import { Regular } from '../../theme/typography'
import PluginBanner from './PluginBanner'

const Container = styled(TouchableOpacity)`
  display: flex;
  flex-direction: column;
`

type Props = {
  plugin: PluginType
  onPress?: () => void
}

const Plugin = ({ plugin, onPress }: Props) => {
  const { title, color, icon, faIcon, materialIcon, ionIcon } = plugin
  const navigation = useRootNavigation()

  return (
    <Container
      onPress={
        onPress ??
        (() =>
          navigation?.navigate(
            'plugin' as never,
            {
              color,
              icon,
              faIcon,
              materialIcon,
              ionIcon,
            } as never
          ))
      }>
      <PluginBanner {...plugin} size={60} />
      <Regular center>{title}</Regular>
    </Container>
  )
}

export default Plugin
