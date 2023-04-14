import Timer from 'app/components/plugins/meditation/Timer'
import Background from 'app/components/ui/Background'
import Spacer from 'app/components/ui/Spacer'
import { PLUGINS } from 'app/helpers/pluginList'
import { COLORS } from 'app/theme/theme'
import { Heading1 } from 'app/theme/typography'
import React from 'react'
import { Image, Text, View } from 'react-native'
import styled from 'styled-components'

const IMAGE_HEIGHT = 350
const ImageContainer = styled(View)`
  position: relative;
  width: 100%;
  height: ${IMAGE_HEIGHT}px;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`

const StyledImage = styled(Image)`
  width: 100%;
  height: ${IMAGE_HEIGHT}px;
  position: absolute;
`

const Meditation = () => {
  return (
    <>
      <ImageContainer>
        <StyledImage source={require('../../../assets/images/woman_meditation.png')} />
        <Heading1 color={COLORS.WHITE}>{PLUGINS['MEDITATE'].title}</Heading1>
      </ImageContainer>
      <Background>
        <Text>Unmute phone to hear a sound when you're done</Text>
        <Spacer x={2} />
        <Timer />
      </Background>
    </>
  )
}

export default Meditation
