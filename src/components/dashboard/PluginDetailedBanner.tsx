import { alpha } from 'axelra-react-native-utilities'
import { LinearGradient } from 'expo-linear-gradient'
import { useRootNavigation } from 'expo-router'
import React, { useMemo } from 'react'
import { Image, ImageSourcePropType, Pressable, View } from 'react-native'
import styled from 'styled-components'
import { plugins, PLUGINS, PLUGIN_COLORS } from '../../helpers/pluginList'
import { useWindowDimensions } from '../../hooks/useWindowDimensions'
import { COLORS, IO_COMPONENT_WIDTH_PERCENT, OUTER_BORDER_RADIUS, SPACING } from '../../theme/theme'
import { Heading5 } from '../../theme/typography'
import PluginBanner from '../discover/PluginBanner'
import Spacer from '../ui/Spacer'

const Wrapper = styled(Pressable)<{ width: number }>`
  height: 200px;
  width: 200px;
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

const AbsoluteImageContainer = styled(View)`
  position: absolute;
  height: 100%;
`

const StyledImage = styled(Image)<{ width: number }>`
  width: 200px;
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
          <Heading5 color={COLORS.WHITE}>{plugin && PLUGINS[plugin].title}</Heading5>
          {plugin && <PluginBanner {...PLUGINS[plugin]} size={40} />}
        </TitleContainer>
        <Spacer x={2} />
        <ContentWrapper>{content}</ContentWrapper>
      </Gradient>
    </Wrapper>
  )
}

export default PluginDetailedBanner
