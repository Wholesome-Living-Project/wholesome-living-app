import React, { useCallback, useEffect } from 'react'
import { Text } from 'react-native'
import styled from 'styled-components'
import { SettingsPluginName } from '../../../api/openapi'
import MeditationHistory from '../../components/dashboard/plugins/MeditationHistory'
import Timer from '../../components/plugins/meditation/Timer'
import { Flex } from '../../components/ui/Flex'
import Spacer from '../../components/ui/Spacer'
import { useMeditate } from '../../provider/MeditationContentProvider'
import { OUTER_BORDER_RADIUS, SPACING } from '../../theme/theme'
import PluginScreenLayout from './PluginScreenLayout'

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
    <PluginScreenLayout plugin={SettingsPluginName.PluginNameMeditation}>
      <Container align={'center'}>
        <Text>Unmute to hear a sound once the timer runs out</Text>
        <Spacer x={2} />
        <Timer onTimerEnded={onMeditationEnded} />
        <Spacer x={4} />
        <MeditationHistory />
      </Container>
    </PluginScreenLayout>
  )
}

export default Meditation
