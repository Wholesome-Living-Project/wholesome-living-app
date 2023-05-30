import Plugin from 'app/components/discover/Plugin'
import Spacer from 'app/components/ui/Spacer'
import { PLUGINS } from 'app/helpers/pluginList'
import React from 'react'
import { FlatList } from 'react-native'

const Discover = () => {
  return (
    <FlatList
      data={Object.values(PLUGINS)}
      centerContent
      horizontal
      showsHorizontalScrollIndicator={false}
      renderItem={({ item }) => (
        <>
          <Spacer x={2} />
          <Plugin plugin={item} />
          <Spacer x={2} />
        </>
      )}
    />
  )
}

export default Discover
