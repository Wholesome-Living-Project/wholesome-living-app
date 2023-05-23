import Plugin from 'app/components/discover/Plugin'
import Spacer from 'app/components/ui/Spacer'
import { PLUGINS } from 'app/helpers/pluginList'
import React from 'react'
import { FlatList, View } from 'react-native'

const PluginList = () => {
  return (
    <View>
      <FlatList
        data={Object.values(PLUGINS)}
        ItemSeparatorComponent={() => <Spacer x={3} />}
        centerContent
        horizontal
        showsHorizontalScrollIndicator={false}
        renderItem={({ item }) => <Plugin plugin={item} />}></FlatList>
    </View>
  )
}

export default PluginList
