import React from 'react'
import { Text, View } from 'react-native'
import styled from 'styled-components'
import { SettingsPluginName } from '../../../../api/openapi'
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
      <Regular color={COLORS.WHITE}>Stairs taken</Regular>
      <Text style={{ fontSize: 33, color: COLORS.WHITE, fontWeight: '600' }}>1</Text>
    </Wrapper>
  )
}

const RunDetailedBanner = () => {
  return (
    <PluginDetailedBanner
      content={<Content />}
      plugin={SettingsPluginName.PluginNameElevator}
      backgroundImage={require('../../../../assets/images/man_walking_stairs.jpg')}
    />
  )
}

export default RunDetailedBanner
