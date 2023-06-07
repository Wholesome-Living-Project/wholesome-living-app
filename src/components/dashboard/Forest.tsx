import React, { Fragment, useMemo } from 'react'
import { ScrollView, TouchableOpacity, View } from 'react-native'
import styled from 'styled-components'
import { SettingsPluginName } from '../../../api/openapi'
import useHaptics from '../../hooks/useHaptics'
import { useWindowDimensions } from '../../hooks/useWindowDimensions'
import { useLevels } from '../../provider/LevelProvider'
import { IO_COMPONENT_WIDTH_PERCENT, OUTER_BORDER_RADIUS, SPACING } from '../../theme/theme'
import { Heading4 } from '../../theme/typography'
import PluginBanner from '../discover/PluginBanner'
import { levelModalRef } from '../refs/modal-refs'
import ExperienceBar from '../ui/ExperienceBar'
import { Flex } from '../ui/Flex'
import Spacer from '../ui/Spacer'
import { Background, levelComponents } from './Levels'
import { SectionTitleContainer } from './SharedStyles'

const Wrapper = styled(View)<{ width: number }>`
  height: 250px;
  width: ${(p) => p.width}px;
  overflow: hidden;
  position: relative;
  border-radius: ${OUTER_BORDER_RADIUS}px;
`

const LevelsContainer = styled(Flex)`
  height: 100%;
  padding: ${SPACING * 2}px ${SPACING * 3}px;
  position: relative;
`

const Scroller = styled(ScrollView)`
  width: 100%;
  position: relative;
`

const LevelContainer = styled(Flex)<{ width: number }>`
  width: ${(p) => p.width}px;
`

const ExperienceContainer = styled(Flex)`
  position: relative;
  top: 20px;
  width: 100%;
`

// TODO change with actual plugin levels
const levels = [6, 2]

const Forest = () => {
  const { windowWidth } = useWindowDimensions()
  const { doMediumFeedback } = useHaptics()
  // TODO: also add plugins which dont have a level yet at level 1 from Onboarding added plugins!
  const { experienceMap, levelMap, setCurrentlyInspectedPlugin } = useLevels()
  const width = useMemo(() => windowWidth * IO_COMPONENT_WIDTH_PERCENT, [windowWidth])

  return (
    <Fragment>
      <SectionTitleContainer>
        <Heading4>Your Garden</Heading4>
      </SectionTitleContainer>
      <Wrapper width={width}>
        <Background source={require('../../../assets/images/background_small.jpg')} />
        <Scroller horizontal>
          <LevelsContainer row align={'flex-end'}>
            {levelMap &&
              Object.keys(levelMap).map((key, index) => (
                <LevelContainer key={index} width={130} align={'center'} column>
                  <ExperienceContainer align={'center'} column>
                    <PluginBanner plugin={key as SettingsPluginName} size={30} />
                    <Spacer x={0.5} />
                    <ExperienceBar
                      progress={(100 / 50) * (experienceMap?.meditation ?? 0)}
                      size={'small'}
                      max={levelMap[key] >= 6}
                      center
                    />
                  </ExperienceContainer>
                  <TouchableOpacity
                    onPress={async () => {
                      setCurrentlyInspectedPlugin(key as SettingsPluginName)
                      await doMediumFeedback()
                      levelModalRef.current?.expand()
                    }}>
                    {levelComponents[Math.max(levelMap[key] - 1, 0)]}
                  </TouchableOpacity>
                </LevelContainer>
              ))}
          </LevelsContainer>
        </Scroller>
      </Wrapper>
    </Fragment>
  )
}

export default Forest
