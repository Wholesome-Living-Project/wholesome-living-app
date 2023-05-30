import Plugin from 'app/components/discover/Plugin'
import Spacer from 'app/components/ui/Spacer'
import { PLUGINS } from 'app/helpers/pluginList'
import React, { Fragment } from 'react'
import { FlatList } from 'react-native'

const Discover = () => {
  return (
    <FlatList
      data={Object.values(PLUGINS)}
      centerContent
      horizontal
      showsHorizontalScrollIndicator={false}
      renderItem={({ item }) => (
        <Fragment>
          <Spacer x={2} />
          <Plugin plugin={item} />
          <Spacer x={2} />
        </Fragment>
      )}
    />
  )
}

export default Discover
