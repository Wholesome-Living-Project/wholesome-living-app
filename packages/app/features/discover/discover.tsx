import { Padder } from 'app/components/Padder'
import PluginList from 'app/components/PluginList'
import { SafeAreaBackground } from 'app/components/SafeAreaBackground'
import Spacer from 'app/components/ui/Spacer'
import { Heading3 } from 'app/theme/typography'
import React from 'react'

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
