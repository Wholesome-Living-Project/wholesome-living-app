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

const StyledImage = styled(Image)`
  width: 100%;
`

const LevelComponent = styled(Flex)`
  position: absolute;
  width: 100px;
  height: 100px;
  border-radius: ${OUTER_BORDER_RADIUS}px;
  background: ${COLORS.PRIMARY};
  border: 4px solid ${COLORS.BLACK};
  right: 40px;
  top: 115px;
  padding: ${SPACING}px;
`

type Props = {
  height: number
  experience?: number
  level?: number
  experienceToNextLevel?: number
}

const levelAssets = [
  require('../../../assets/images/levels/seed_small.png'),
  require('../../../assets/images/levels/sprout_small.png'),
  require('../../../assets/images/levels/sapling_small.png'),
  require('../../../assets/images/levels/small_small.png'),
  require('../../../assets/images/levels/middle_small.png'),
  require('../../../assets/images/levels/big_small.png'),
]

const Tree = ({ height, experience = 0, level = 1, experienceToNextLevel = 15 }: Props) => {
  return (
    <Container style={{ height }} row justify={'center'} align={'center'}>
      <Image source={levelAssets[level - 1]} style={{ width: 300, height: 300 }} />
      <LevelComponent>
        <Regular color={COLORS.WHITE}>Level {level}</Regular>
        <ExperienceBar progress={(100 / experienceToNextLevel) * experience} />
        <Caption color={COLORS.WHITE}>
          Exp: {clamp(experience, 0, experienceToNextLevel)}/{experienceToNextLevel}
        </Caption>
      </LevelComponent>
    </Container>
  )
}

export default Tree
