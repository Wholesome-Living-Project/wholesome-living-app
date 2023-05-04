import PluginBannerWeb from 'app/components/discover/web/PluginBannerWeb'
import { PluginType } from 'app/helpers/pluginList'
import { Flex } from 'axelra-styled-bootstrap-grid'
import React from 'react'
import styled from 'styled-components'

const Container = styled(Flex)`
  cursor: pointer;
`

const PluginWeb = ({ plugin }: { plugin: PluginType }) => {
  return (
    <Container>
      <PluginBannerWeb {...plugin} size={60} />
    </Container>
  )
}

export default PluginWeb
