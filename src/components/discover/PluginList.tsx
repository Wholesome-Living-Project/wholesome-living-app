import React from 'react'
import { FlatList, View } from 'react-native'
import { PLUGINS } from '../../helpers/pluginList'
import Spacer from '../ui/Spacer'
import Plugin from './Plugin'

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
