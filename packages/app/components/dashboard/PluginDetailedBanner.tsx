import { MaterialCommunityIcons } from '@expo/vector-icons'
import PluginBanner from 'app/components/discover/PluginBanner'
import Spacer from 'app/components/ui/Spacer'
import { plugins, PLUGINS, PLUGIN_COLORS } from 'app/helpers/pluginList'
import { useWindowDimensions } from 'app/hooks/useWindowDimensions'
import { COLORS, IO_COMPONENT_WIDTH_PERCENT, OUTER_BORDER_RADIUS, SPACING } from 'app/theme/theme'
import { Heading4 } from 'app/theme/typography'
import { alpha } from 'axelra-react-native-utilities'
import { LinearGradient } from 'expo-linear-gradient'
import { useRootNavigation } from 'expo-router'
import React, { useMemo } from 'react'
import { Image, ImageSourcePropType, Pressable, View } from 'react-native'
import styled from 'styled-components'

const Wrapper = styled(Pressable)<{ width: number }>`
  height: 250px;
  width: ${(p) => p.width}px;
  overflow: hidden;
  position: relative;
`

const Gradient = styled(LinearGradient)`
  flex: 1;
  padding: ${SPACING * 3}px;
  border-radius: ${OUTER_BORDER_RADIUS}px;
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

const AbsoluteImageContainer = styled(View)`
  position: absolute;
  height: 100%;
`

const StyledImage = styled(Image)<{ width: number }>`
  width: ${(p) => p.width}px;
  height: 100%;

  border-radius: ${OUTER_BORDER_RADIUS}px;
`

type Props = { plugin: plugins; content?: React.ReactNode; backgroundImage?: ImageSourcePropType }

// TODO use animated API for animating pressable in a separate component

const PluginDetailedBanner = ({ content, plugin, backgroundImage }: Props) => {
  const { windowWidth } = useWindowDimensions()
  const width = useMemo(() => windowWidth * IO_COMPONENT_WIDTH_PERCENT, [windowWidth])
  const { route } = PLUGINS[plugin]

  const navigation = useRootNavigation()

  return (
    <Wrapper width={width} onPress={() => navigation?.navigate(route as never)}>
      {backgroundImage && (
        <AbsoluteImageContainer>
          <StyledImage source={backgroundImage} width={width} />
        </AbsoluteImageContainer>
      )}
      <Gradient
        colors={[alpha(0.8, PLUGIN_COLORS[plugin]), alpha(0.2, PLUGIN_COLORS[plugin])]}
        start={{ x: 0.1, y: 0.3 }}>
        <TitleContainer>
          <Heading4 color={COLORS.WHITE}>{plugin && PLUGINS[plugin].title}</Heading4>
          {plugin && <PluginBanner {...PLUGINS[plugin]} size={40} />}
        </TitleContainer>
        <Spacer x={1} />
        <ContentWrapper>{content}</ContentWrapper>
        <ArrowContainer>
          <MaterialCommunityIcons name={'arrow-right'} size={35} color={COLORS.WHITE} />
        </ArrowContainer>
      </Gradient>
    </Wrapper>
  )
}

export default PluginDetailedBanner