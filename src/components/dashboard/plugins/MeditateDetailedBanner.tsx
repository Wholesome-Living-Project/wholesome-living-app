import React, { useMemo } from 'react'
import { Text, View } from 'react-native'
import styled from 'styled-components'
import { SettingsPluginName } from '../../../../api/openapi'
import { getFormattedTimer } from '../../../helpers/getFormattedTimer'
import { PLUGINS } from '../../../helpers/pluginList'
import { COLORS } from '../../../theme/theme'
import { Regular } from '../../../theme/typography'
import PluginDetailedBanner from '../PluginDetailedBanner'

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
      <Regular color={COLORS.WHITE}>Last Meditation</Regular>
      <Text style={{ fontSize: 33, color: COLORS.WHITE, fontWeight: '600' }}>{computedTime}</Text>
    </Wrapper>
  )
}

const MeditateDetailedBanner = () => {
  return (
    <PluginDetailedBanner
      content={<Content />}
      plugin={SettingsPluginName.PluginNameMeditation}
      backgroundImage={PLUGINS.meditation.image}
    />
  )
}

export default MeditateDetailedBanner
