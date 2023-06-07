import React, { PropsWithChildren } from 'react'
import { Image, ScrollView } from 'react-native'
import styled from 'styled-components'
import { SettingsPluginName } from '../../../api/openapi'
import Tree from '../../components/plugins/Tree'
import Spacer from '../../components/ui/Spacer'
import { PLUGINS } from '../../helpers/pluginList'
import { useLevels } from '../../provider/LevelProvider'

const IMAGE_HEIGHT = 290

const StyledImage = styled(Image)`
  width: 100%;
  height: ${IMAGE_HEIGHT}px;
  position: absolute;
`

type Props = { plugin: SettingsPluginName } & PropsWithChildren

const PluginScreenLayout = ({ children, plugin }: Props) => {
  const { levelMap, experienceMap } = useLevels()

  return (
    <ScrollView>
      <StyledImage source={PLUGINS[plugin].image} />
      <Spacer x={10} />
      <Tree
        height={IMAGE_HEIGHT}
        experience={experienceMap?.[plugin] ?? 0}
        level={levelMap?.[plugin] && levelMap?.[plugin] > 0 ? levelMap?.[plugin] : 1}
        experienceToNextLevel={15}
      />
      {children}
    </ScrollView>
  )
}

export default PluginScreenLayout
