import PluginList from 'app/components/discover/PluginList'
import { Padder } from 'app/components/ui/Padder'
import { SafeArea } from 'app/components/ui/SafeArea'
import Spacer from 'app/components/ui/Spacer'
import { Heading3 } from 'app/theme/typography'
import React from 'react'

const DiscoverScreen = () => {
  return (
    <SafeArea>
      <Padder>
        <Heading3>Discover new ways to create Habits</Heading3>
        <Spacer x={4} />
        <PluginList />
      </Padder>
    </SafeArea>
  )
}

export default DiscoverScreen
