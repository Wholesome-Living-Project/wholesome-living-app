import { useRootNavigation } from 'expo-router'
import React, { useMemo } from 'react'
import { Image, ImageSourcePropType, TouchableOpacity, View } from 'react-native'
import styled from 'styled-components'
import { SettingsPluginName } from '../../../api/openapi'
import { PLUGINS } from '../../helpers/pluginList'
import { useWindowDimensions } from '../../hooks/useWindowDimensions'
import { COLORS, IO_COMPONENT_WIDTH_PERCENT, OUTER_BORDER_RADIUS, SPACING } from '../../theme/theme'
import { Heading5 } from '../../theme/typography'
import PluginBanner from '../discover/PluginBanner'
import Spacer from '../ui/Spacer'

const BANNER_SIZE = 200

const Wrapper = styled(TouchableOpacity)<{ width: number }>`
  height: ${BANNER_SIZE}px;
  width: ${BANNER_SIZE}px;
  overflow: hidden;
  position: relative;
`

const Container = styled(View)`
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
  width: ${BANNER_SIZE}px;
  height: 100%;

  border-radius: ${OUTER_BORDER_RADIUS}px;
`

type Props = {
  plugin: SettingsPluginName
  content?: React.ReactNode
  backgroundImage?: ImageSourcePropType
}

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
      <Container>
        <TitleContainer>
          <Heading5 color={COLORS.WHITE}>{plugin && PLUGINS[plugin].title}</Heading5>
          {plugin && <PluginBanner plugin={plugin} size={40} />}
        </TitleContainer>
        <Spacer x={2} />
        <ContentWrapper>{content}</ContentWrapper>
      </Container>
    </Wrapper>
  )
}

export default PluginDetailedBanner
