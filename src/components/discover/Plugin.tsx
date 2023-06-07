import { useRootNavigation } from 'expo-router'
import React, { useMemo } from 'react'
import { TouchableOpacity } from 'react-native'
import styled from 'styled-components'
import { SettingsPluginName } from '../../../api/openapi'
import { PLUGINS } from '../../helpers/pluginList'
import { Body } from '../../theme/typography'
import Spacer from '../ui/Spacer'
import PluginBanner from './PluginBanner'

const Container = styled(TouchableOpacity)`
  display: flex;
  flex-direction: column;
`

type Props = {
  plugin: SettingsPluginName
  onPress?: () => void
}

const Plugin = ({ plugin, onPress }: Props) => {
  console.log(plugin)
  const navigation = useRootNavigation()
  const title = useMemo(() => (plugin ? PLUGINS[plugin].title : ''), [plugin])

  return (
    <Container onPress={onPress ?? (() => navigation?.navigate(PLUGINS[plugin].route as never))}>
      <PluginBanner plugin={plugin ?? 'meditation'} size={60} />
      <Spacer x={0.3} />
      {title && <Body center>{title}</Body>}
    </Container>
  )
}

export default Plugin
