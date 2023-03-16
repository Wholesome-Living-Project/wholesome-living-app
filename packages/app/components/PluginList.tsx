import Plugin, { PluginType } from 'app/components/Plugin'
import Spacer from 'app/components/ui/Spacer'
import { COLORS, EXTRA_COLORS, SPACING } from 'app/theme/theme'
import React from 'react'
import { FlatList, View } from 'react-native'

const PLUGINS: PluginType[] = [
  { title: 'Meditate', color: EXTRA_COLORS.BLUE },
  { title: 'Elevator', color: EXTRA_COLORS.PURPLE },
  { title: 'Run', color: EXTRA_COLORS.OCEAN },
  { title: 'Sleep', color: EXTRA_COLORS.MAUVE },
  { title: 'Run', color: EXTRA_COLORS.JORDY },
  { title: 'Sleep', color: COLORS.CTA },
  { title: 'Run', color: EXTRA_COLORS.BLUE },
  { title: 'Sleep', color: EXTRA_COLORS.OCEAN },
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
        contentInset={{ top: 0, left: SPACING * 4, bottom: 0, right: SPACING * 4 }}
        renderItem={({ item }) => <Plugin title={item.title} color={item.color} />}></FlatList>
    </View>
  )
}

export default PluginList
