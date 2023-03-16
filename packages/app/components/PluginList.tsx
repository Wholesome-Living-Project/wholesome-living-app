import Plugin, { PluginType } from 'app/components/Plugin'
import Spacer from 'app/components/ui/Spacer'
import { EXTRA_COLORS } from 'app/theme/theme'
import React from 'react'
import { FlatList, View } from 'react-native'

const PLUGINS: PluginType[] = [
  { title: 'Meditate', color: EXTRA_COLORS.BLUE, icon: 'meditation' },
  { title: 'Elevator', color: EXTRA_COLORS.PURPLE, icon: 'elevator-passenger' },
  { title: 'Run', color: EXTRA_COLORS.OCEAN, materialIcon: 'directions-run' },
  { title: 'Sleep', color: EXTRA_COLORS.MAUVE, icon: 'power-sleep' },
  { title: 'Workout', color: EXTRA_COLORS.JORDY, materialIcon: 'fitness-center' },
  { title: 'Diet', color: EXTRA_COLORS.PURPLE, icon: 'weight-kilogram' },
]
const PluginList = () => {
  return (
    <View>
      <FlatList
        data={PLUGINS}
        ItemSeparatorComponent={() => <Spacer x={3} />}
        centerContent
        horizontal
        showsHorizontalScrollIndicator={false}
        renderItem={({ item }) => <Plugin {...item} />}></FlatList>
    </View>
  )
}

export default PluginList
