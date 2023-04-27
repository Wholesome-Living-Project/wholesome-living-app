import PluginDetailedBanner from 'app/components/dashboard/PluginDetailedBanner'
import { getFormattedTimer } from 'app/helpers/getFormattedTimer'
import { plugins } from 'app/helpers/pluginList'
import { COLORS } from 'app/theme/theme'
import { Light } from 'app/theme/typography'
import React, { useMemo } from 'react'
import { Text, View } from 'react-native'
import styled from 'styled-components'

type MeditationType = {
  time: number
}
const MEDITATION_DATA: MeditationType[] = [
  {
    time: 30,
  },
  {
    time: 50,
  },
  {
    time: 89,
  },
]

const Wrapper = styled(View)`
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
`

const Content = () => {
  const computedTime = useMemo(() => {
    return getFormattedTimer(MEDITATION_DATA[MEDITATION_DATA.length - 1]?.time)
  }, [])

  return (
    <Wrapper>
      <Light color={COLORS.WHITE}>Last Meditation</Light>
      <Text style={{ fontSize: 55, color: COLORS.WHITE }}>{computedTime}</Text>
    </Wrapper>
  )
}

const MeditateDetailedBanner = () => {
  return (
    <PluginDetailedBanner
      content={<Content />}
      plugin={plugins.MEDITATE}
      backgroundImage={require('../../../../assets/images/woman_meditation.jpg')}
    />
  )
}

export default MeditateDetailedBanner
