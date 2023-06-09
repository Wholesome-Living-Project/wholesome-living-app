import React, { useMemo } from 'react'
import { Text, View } from 'react-native'
import styled from 'styled-components'
import { SettingsPluginName } from '../../../../api/openapi'
import { getFormattedTimer } from '../../../helpers/getFormattedTimer'
import { PLUGINS } from '../../../helpers/pluginList'
import { useMeditate } from '../../../provider/MeditationContentProvider'
import { COLORS } from '../../../theme/theme'
import { Regular } from '../../../theme/typography'
import PluginDetailedBanner from '../PluginDetailedBanner'

type MeditationType = {
  time: number
}

const Wrapper = styled(View)`
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
`

const Content = () => {
  const { meditations } = useMeditate()

  const computedTime = useMemo(() => {
    return getFormattedTimer(
      meditations.meditations?.[meditations.meditations.length - 1]?.meditationTime || 0
    )
  }, [meditations.meditations])

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
