import PluginBanner from 'app/components/discover/PluginBanner'
import { PluginType } from 'app/helpers/pluginList'
import { Regular } from 'app/theme/typography'
import React from 'react'
import { TouchableOpacity } from 'react-native'
import styled from 'styled-components'

const Container = styled(TouchableOpacity)`
  display: flex;
  flex-direction: column;
`

const Plugin = (plugin: PluginType) => {
  return (
    <Container>
      <PluginBanner {...plugin} size={60} />
      <Regular center>{plugin.title}</Regular>
    </Container>
  )
}

export default Plugin
