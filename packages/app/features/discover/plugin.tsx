import Background from 'app/components/Background'
import PluginBanner from 'app/components/PluginBanner'
import Button from 'app/components/ui/Button'
import Spacer from 'app/components/ui/Spacer'
import { COLORS } from 'app/theme/theme'
import { Light } from 'app/theme/typography'
import React from 'react'
import { Text } from 'react-native'
import { createParam } from 'solito'
import { PluginNavigationProps } from 'wholesome-living-app/types/navigation/DiscoverNavigationTypes'

const { useParam } = createParam<PluginNavigationProps>()

const PluginDetailScreen = () => {
  const [name] = useParam('name')
  const [color] = useParam('color')
  const [icon] = useParam('icon')
  const [faIcon] = useParam('faIcon')
  const [materialIcon] = useParam('materialIcon')
  const [ionIcon] = useParam('ionIcon')

  return (
    <Background>
      <PluginBanner
        title={''}
        color={color}
        icon={icon}
        faIcon={faIcon}
        materialIcon={materialIcon}
        ionIcon={ionIcon}
        size={100}
      />
      <Spacer x={6} />
      <Text>This is the detail view of plugin {name}</Text>
      <Spacer x={3} />

      <Button buttonType={'cta'} small>
        <Light color={COLORS.WHITE}>Add to your Habits</Light>
      </Button>
    </Background>
  )
}

export default PluginDetailScreen
