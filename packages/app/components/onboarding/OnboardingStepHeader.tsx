import PluginBanner from 'app/components/discover/PluginBanner'
import { Flex } from 'app/components/ui/Flex'
import { PLUGINS } from 'app/helpers/pluginList'
import { COLORS, SPACING } from 'app/theme/theme'
import { Heading4 } from 'app/theme/typography'
import { alpha } from 'axelra-react-native-utilities'
import { LinearGradient } from 'expo-linear-gradient'
import React, { useMemo } from 'react'
import styled from 'styled-components'
import BackButton from 'wholesome-living-app/components/BackButton'
import { UserPluginName } from '../../../api/openapi'

const Container = styled(Flex)`
  padding: ${SPACING * 7}px ${SPACING * 2}px ${SPACING * 1.5}px;
`

type Props = {
  plugin?: UserPluginName
}

const OnboardingStepHeader = ({ plugin }: Props) => {
  const title = useMemo(() => plugin && PLUGINS[plugin].title, [plugin])
  const color = useMemo(() => plugin && PLUGINS[plugin].color, [plugin])

  if (!plugin || !title) return null
  return (
    <LinearGradient
      colors={[
        color ?? COLORS.PRIMARY,
        color ? alpha(0.8, color) : COLORS.PRIMARY,
        color ? alpha(0.4, color) : COLORS.PRIMARY,
      ]}
      end={{ x: 0.8, y: 0.9 }}
      start={{ x: 0.1, y: 0.1 }}>
      <Container row justify={'space-between'} align={'center'}>
        <BackButton color={COLORS.WHITE} size={'md'} />
        <Heading4 color={COLORS.WHITE}>{title}</Heading4>
        <PluginBanner {...PLUGINS[plugin]} size={45} />
      </Container>
    </LinearGradient>
  )
}

export default OnboardingStepHeader
