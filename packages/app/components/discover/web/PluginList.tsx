import PluginWeb from 'app/components/discover/web/PluginWeb'
import { PLUGINS } from 'app/helpers/pluginList'
import { SPACING } from 'app/theme/theme'
import { Flex } from 'axelra-styled-bootstrap-grid'
import React from 'react'
import styled from 'styled-components'

const Wrapper = styled(Flex)`
  gap: ${SPACING}px;
`

const PluginList = () => {
  return (
    <Wrapper row>
      {Object.keys(PLUGINS).map((pluginKey) => (
        <PluginWeb plugin={PLUGINS[pluginKey]} />
      ))}
    </Wrapper>
  )
}

export default PluginList
