import React from 'react'
import { Text, View } from 'react-native'
import styled from 'styled-components'
import { plugins } from '../../../helpers/pluginList'
import { COLORS } from '../../../theme/theme'
import { Regular } from '../../../theme/typography'
import PluginDetailedBanner from '../PluginDetailedBanner'

const Wrapper = styled(View)`
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
`

const Content = () => {
  return (
    <Wrapper>
      <Regular color={COLORS.WHITE}>Saved this month</Regular>
      <Text style={{ fontSize: 33, color: COLORS.WHITE, fontWeight: '600' }}>26.-</Text>
    </Wrapper>
  )
}

const RunDetailedBanner = () => {
  return (
    <PluginDetailedBanner
      content={<Content />}
      plugin={plugins.RUN}
      backgroundImage={require('../../../../assets/images/man_jogging.jpg')}
    />
  )
}

export default RunDetailedBanner
