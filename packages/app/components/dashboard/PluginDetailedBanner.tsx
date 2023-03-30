import { MaterialCommunityIcons } from '@expo/vector-icons'
import PluginBanner from 'app/components/discover/PluginBanner'
import Spacer from 'app/components/ui/Spacer'
import { plugins, PLUGINS, PLUGIN_COLORS } from 'app/helpers/pluginList'
import { useWindowDimensions } from 'app/hooks/useWindowDimensions'
import { COLORS, IO_COMPONENT_WIDTH_PERCENT, OUTER_BORDER_RADIUS, SPACING } from 'app/theme/theme'
import { Heading4 } from 'app/theme/typography'
import { alpha } from 'axelra-react-native-utilities'
import { useRootNavigation } from 'expo-router'
import React, { useMemo } from 'react'
import { Pressable, View } from 'react-native'
import styled from 'styled-components'

const Wrapper = styled(Pressable)<{ width: number; fillColor: string }>`
  border-radius: ${OUTER_BORDER_RADIUS}px;
  height: 250px;
  width: ${(p) => p.width}px;
  background-color: ${(p) => p.fillColor};
  padding: ${SPACING * 3}px;
  overflow: hidden;
`

const ContentWrapper = styled(View)`
  display: flex;
  flex-direction: row;
  justify-content: center;
  flex: 1;
`

const TitleContainer = styled(View)`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`

const ArrowContainer = styled(View)`
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  align-items: flex-end;
`

type Props = {
  content?: React.ReactNode
  plugin: plugins
}

const PluginDetailedBanner = ({ content, plugin }: Props) => {
  const { windowWidth, windowHeight } = useWindowDimensions()
  const width = useMemo(() => windowWidth * IO_COMPONENT_WIDTH_PERCENT, [windowWidth])
  const { color, icon, faIcon, materialIcon, ionIcon } = PLUGINS[plugin]

  const background = useMemo(() => {
    if (!plugin) return COLORS.SECONDARY
    return alpha(0.4, PLUGIN_COLORS[plugin])
  }, [plugin])

  const arrowColor = useMemo(() => {
    if (!plugin) return COLORS.SECONDARY
    return PLUGIN_COLORS[plugin]
  }, [plugin])

  const navigation = useRootNavigation()

  return (
    <Wrapper
      width={width}
      fillColor={background}
      onPress={() =>
        navigation?.navigate(
          'plugin' as never,
          {
            color,
            icon,
            faIcon,
            materialIcon,
            ionIcon,
          } as never
        )
      }>
      <TitleContainer>
        <Heading4>{plugin && PLUGINS[plugin].title}</Heading4>
        {plugin && <PluginBanner {...PLUGINS[plugin]} size={40} />}
      </TitleContainer>
      <Spacer x={1} />
      <ContentWrapper>{content}</ContentWrapper>
      <ArrowContainer>
        <MaterialCommunityIcons name={'arrow-right'} size={35} color={arrowColor} />
      </ArrowContainer>
    </Wrapper>
  )
}

export default PluginDetailedBanner
