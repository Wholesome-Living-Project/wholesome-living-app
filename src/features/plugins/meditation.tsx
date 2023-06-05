import React, { useCallback, useEffect } from 'react'
import { Image, ScrollView, Text, View } from 'react-native'
import styled from 'styled-components'
import MeditationHistory from '../../components/dashboard/plugins/MeditationHistory'
import Timer from '../../components/plugins/meditation/Timer'
import { Flex } from '../../components/ui/Flex'
import Spacer from '../../components/ui/Spacer'
import { PLUGINS } from '../../helpers/pluginList'
import { useMeditate } from '../../provider/MeditationContentProvider'
import { COLORS, OUTER_BORDER_RADIUS, SPACING } from '../../theme/theme'
import { Heading1 } from '../../theme/typography'

const IMAGE_HEIGHT = 320
const ImageContainer = styled(View)`
  position: absolute;
  width: 100%;
  height: ${IMAGE_HEIGHT}px;
  display: flex;
  flex-direction: row;
  justify-content: center;
`

const StyledImage = styled(Image)`
  width: 100%;
  height: ${IMAGE_HEIGHT}px;
  position: absolute;
`

const Container = styled(Flex)`
  position: relative;
  background-color: ${COLORS.GREY};
  border-radius: ${OUTER_BORDER_RADIUS}px;
  padding: ${SPACING * 4}px;
`

const Meditation = () => {
  const { saveMeditation, getMeditations } = useMeditate()

  useEffect(() => {
    getMeditations()
  }, [getMeditations])

  const onMeditationEnded = useCallback(
    async (time: number) => {
      await saveMeditation(time)
      await getMeditations()
    },
    [getMeditations, saveMeditation]
  )

  return (
    <>
      <ImageContainer>
        <StyledImage source={require('../../../assets/images/woman_meditation.jpg')} />
        <Flex column>
          <Spacer x={15} />
          <Heading1 color={COLORS.WHITE}>{PLUGINS.meditation.title}</Heading1>
        </Flex>
      </ImageContainer>
      <ScrollView>
        <Spacer x={30} />
        <Container align={'center'}>
          <Text>Unmute phone to hear a sound when you're done</Text>
          <Spacer x={2} />
          <Timer onTimerEnded={onMeditationEnded} />
          <Spacer x={4} />
          <MeditationHistory />
        </Container>
      </ScrollView>
    </>
  )
}

export default Meditation
