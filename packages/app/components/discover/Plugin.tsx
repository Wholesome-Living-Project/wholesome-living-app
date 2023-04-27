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
  const { title, color, icon, faIcon, materialIcon, ionIcon } = plugin

  return (
    <Container>
      <Regular center>{title}</Regular>
    </Container>
  )
}

export default Plugin
