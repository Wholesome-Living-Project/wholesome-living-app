import Background from 'app/components/ui/Background'
import React from 'react'
import { Text } from 'react-native'
import { createParam } from 'solito'
import { PluginNavigationProps } from '../../../types/navigation/DiscoverNavigationTypes'

const { useParam } = createParam<PluginNavigationProps>()

const PluginScreen = () => {
  const [name] = useParam('name')
  const [color] = useParam('color')
  const [icon] = useParam('icon')
  const [faIcon] = useParam('faIcon')
  const [materialIcon] = useParam('materialIcon')
  const [ionIcon] = useParam('ionIcon')

  return (
    <Background>
      <Text>This is the detail view of plugin {name}</Text>
    </Background>
  )
}

export default PluginScreen
