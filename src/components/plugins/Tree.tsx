import React from 'react'
import { Image } from 'react-native'
import styled from 'styled-components'
import { COLORS, OUTER_BORDER_RADIUS, SPACING } from '../../theme/theme'
import { Caption, Regular } from '../../theme/typography'
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

const ExperienceBackground = styled(Flex)`
  width: 100%;
  background: ${COLORS.BLACK};
  border-radius: ${OUTER_BORDER_RADIUS}px;
  height: 12px;
  border: 3px solid ${COLORS.BLACK};
  position: relative;
`

const Experience = styled(Flex)`
  width: 40%;
  height: 100%;
  background: ${COLORS.WHITE};
`

type Props = {
  height: number
  experience: number
  level: number
  experienceToNextLevel: number
}

const levelAssets = [
  require('../../../assets/images/levels/seed.png'),
  require('../../../assets/images/levels/sprout.png'),
  require('../../../assets/images/levels/sapling.png'),
  require('../../../assets/images/levels/small.png'),
  require('../../../assets/images/levels/middle.png'),
  require('../../../assets/images/levels/big.png'),
]

const Tree = ({ height, experience, level, experienceToNextLevel }: Props) => {
  return (
    <Container style={{ height }} row justify={'center'} align={'center'}>
      <StyledImage source={levelAssets[level - 1]} style={{ width: 300, height: 300 }} />
      <LevelComponent>
        <Regular color={COLORS.WHITE}>Level {level}</Regular>
        <ExperienceBackground>
          <Experience />
        </ExperienceBackground>
        <Caption color={COLORS.WHITE}>
          Exp: {experience}/{experienceToNextLevel}
        </Caption>
      </LevelComponent>
    </Container>
  )
}

export default Tree
