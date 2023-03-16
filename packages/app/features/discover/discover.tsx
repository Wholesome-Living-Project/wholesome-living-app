import PluginList from 'app/components/PluginList'
import { SafeAreaBackground } from 'app/components/SafeAreaBackground'
import Spacer from 'app/components/ui/Spacer'
import { SPACING } from 'app/theme/theme'
import { Heading3 } from 'app/theme/typography'
import React from 'react'
import { View } from 'react-native'
import styled from 'styled-components'

const Padder = styled(View)`
  padding: ${SPACING * 4}px;
`
const DiscoverScreen = () => {
  return (
    <SafeAreaBackground>
      <Padder>
        <Heading3>Discover new ways to create Habits</Heading3>
        <Spacer x={4} />
        <PluginList />
      </Padder>
    </SafeAreaBackground>
  )
}

export default DiscoverScreen
