import { OUTER_BORDER_RADIUS } from 'app/theme/theme'
import React from 'react'
import { View } from 'react-native'
import styled from 'styled-components'

const Wrapper = styled(View)`
  border-radius: ${OUTER_BORDER_RADIUS};
`

const PluginDetailedBanner = () => {
  return <Wrapper></Wrapper>
}

export default PluginDetailedBanner
