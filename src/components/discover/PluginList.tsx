import React from 'react'
import { FlatList, View } from 'react-native'
import { SettingsPluginName } from '../../../api/openapi'
import Spacer from '../ui/Spacer'
import Plugin from './Plugin'

const PluginList = () => {
  return (
    <View>
      <FlatList
        data={Object.values(SettingsPluginName)}
        ItemSeparatorComponent={() => <Spacer x={3} />}
        centerContent
        horizontal
        showsHorizontalScrollIndicator={false}
        renderItem={({ item }) => <Plugin plugin={item} />}></FlatList>
    </View>
  )
}

export default PluginList
