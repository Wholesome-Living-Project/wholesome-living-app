import { Flex } from 'axelra-react-native-flex'
import React, { forwardRef, PropsWithChildren } from 'react'
import { Image, ScrollView } from 'react-native'
import styled from 'styled-components'
import { SettingsPluginName } from '../../../api/openapi'
import Tree from '../../components/plugins/Tree'
import Spacer from '../../components/ui/Spacer'
import { PLUGINS } from '../../helpers/pluginList'
import { useLevels } from '../../provider/LevelProvider'
import { SPACING } from '../../theme/theme'

const IMAGE_HEIGHT = 290

const StyledImage = styled(Image)`
  width: 100%;
  height: ${IMAGE_HEIGHT}px;
  position: absolute;
`

const Padder = styled(Flex)`
  padding: ${SPACING * 4}px;
`

type Props = { plugin: SettingsPluginName } & PropsWithChildren

const PluginScreenLayout = forwardRef<ScrollView, Props>(({ children, plugin }, ref) => {
  const { levelMap, experienceMap } = useLevels()

  console.log(levelMap)

  return (
    <ScrollView ref={ref} showsVerticalScrollIndicator={false}>
      <StyledImage source={PLUGINS[plugin].image} blurRadius={5} />
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
