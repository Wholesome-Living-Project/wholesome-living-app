import React, { useCallback, useEffect } from 'react'
import { Image, ScrollView, Text } from 'react-native'
import styled from 'styled-components'
import MeditationHistory from '../../components/dashboard/plugins/MeditationHistory'
import Timer from '../../components/plugins/meditation/Timer'
import Tree from '../../components/plugins/Tree'
import { Flex } from '../../components/ui/Flex'
import Spacer from '../../components/ui/Spacer'
import { useMeditate } from '../../provider/MeditationContentProvider'
import { OUTER_BORDER_RADIUS, SPACING } from '../../theme/theme'

const IMAGE_HEIGHT = 290

const StyledImage = styled(Image)`
  width: 100%;
  height: ${IMAGE_HEIGHT}px;
  position: absolute;
`

const Container = styled(Flex)`
  position: relative;
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
    <ScrollView>
      <StyledImage source={require('../../../assets/images/woman_meditation.jpg')} />
      <Spacer x={10} />
      <Tree height={IMAGE_HEIGHT} experience={3} level={6} experienceToNextLevel={15} />
      <Container align={'center'}>
        <Text>Unmute phone to hear a sound when you're done</Text>
        <Spacer x={2} />
        <Timer onTimerEnded={onMeditationEnded} />
        <Spacer x={4} />
        <MeditationHistory />
      </Container>
    </ScrollView>
  )
}

export default Meditation
