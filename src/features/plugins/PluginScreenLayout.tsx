import { Flex } from 'axelra-react-native-flex'
import { alpha } from 'axelra-react-native-utilities'
import React, { forwardRef, PropsWithChildren } from 'react'
import { Image, ScrollView } from 'react-native'
import styled from 'styled-components'
import { SettingsPluginName } from '../../../api/openapi'
import Tree from '../../components/plugins/Tree'
import Spacer from '../../components/ui/Spacer'
import { PLUGINS } from '../../helpers/pluginList'
import { useLevels } from '../../provider/LevelProvider'
import { COLORS } from '../../theme/theme'

const IMAGE_HEIGHT = 290

const StyledImage = styled(Image)`
  width: 100%;
  height: ${IMAGE_HEIGHT}px;
  position: absolute;
`

const BackgroundImageOverlay = styled(Flex)`
  background: ${alpha(0.2, COLORS.BLACK)};
  width: 100%;
  height: ${IMAGE_HEIGHT}px;
  position: absolute;
`

type Props = { plugin: SettingsPluginName } & PropsWithChildren

const PluginScreenLayout = forwardRef<ScrollView, Props>(({ children, plugin }, ref) => {
  const { levelMap, experienceMap } = useLevels()

  return (
    <ScrollView ref={ref} showsVerticalScrollIndicator={false}>
      <StyledImage source={PLUGINS[plugin].image} blurRadius={4} />
      <BackgroundImageOverlay />
      <Spacer x={10} />

      <Tree
        height={IMAGE_HEIGHT}
        experience={experienceMap?.[plugin] ?? 0}
        level={levelMap?.[plugin] && levelMap?.[plugin] > 0 ? levelMap?.[plugin] : 0}
        experienceToNextLevel={50}
      />
      {children}
    </ScrollView>
  )
})

export default PluginScreenLayout
