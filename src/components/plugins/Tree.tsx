import React from 'react'
import { Image } from 'react-native'
import styled from 'styled-components'
import { clamp } from '../../helpers/clamp'
import { COLORS, OUTER_BORDER_RADIUS, SPACING } from '../../theme/theme'
import { Caption, Regular } from '../../theme/typography'
import ExperienceBar from '../ui/ExperienceBar'
import { Flex } from '../ui/Flex'

const Container = styled(Flex)`
  width: 100%;
`

const LevelComponent = styled(Flex)<{ currentContainerHeight: number }>`
  position: absolute;
  width: 80px;
  height: 80px;
  border-radius: ${OUTER_BORDER_RADIUS}px;
  background: ${COLORS.PRIMARY};
  right: 40px;
  top: ${(p) => p.currentContainerHeight / 2.5}px;
  padding: ${SPACING}px;
`

type Props = {
  height: number
  experience?: number
  level?: number
  experienceToNextLevel?: number
  max?: number
}

const levelAssets = [
  require('../../../assets/images/levels/seed_small.png'),
  require('../../../assets/images/levels/sprout_small.png'),
  require('../../../assets/images/levels/sapling_small.png'),
  require('../../../assets/images/levels/small_small.png'),
  require('../../../assets/images/levels/middle_small.png'),
  require('../../../assets/images/levels/big_small.png'),
  require('../../../assets/images/levels/gold_gold_border.png'),
]

const Tree = ({
  height,
  experience = 0,
  level = 0,
  experienceToNextLevel = 50,
  max = 6,
}: Props) => {
  return (
    <Container style={{ height }} row justify={'center'} align={'center'}>
      <Image source={levelAssets[level]} style={{ width: height, height }} />
      <LevelComponent column justify={'center'} align={'center'} currentContainerHeight={height}>
        <Regular color={COLORS.WHITE}>Level {clamp(level + 1, 0, 7)}</Regular>
        <ExperienceBar progress={(100 / experienceToNextLevel) * experience} max={max <= level} />
        {max > level ? (
          <Caption color={COLORS.WHITE}>
            Exp: {clamp(experience, 0, experienceToNextLevel)}/{experienceToNextLevel}
          </Caption>
        ) : (
          <Caption color={COLORS.WHITE}>Well done!</Caption>
        )}
      </LevelComponent>
    </Container>
  )
}

export default Tree
