import { FontAwesome5 } from '@expo/vector-icons'
import React, { useMemo } from 'react'
import { ScrollView, TouchableOpacity, View } from 'react-native'
import styled from 'styled-components'
import { SettingsPluginName } from '../../../api/openapi'
import useHaptics from '../../hooks/useHaptics'
import { useWindowDimensions } from '../../hooks/useWindowDimensions'
import { useLevels } from '../../provider/LevelProvider'
import { useOnboarding } from '../../provider/OnboardingProvider'
import { COLORS, SPACING } from '../../theme/theme'
import PluginBanner from '../discover/PluginBanner'
import { levelExplanationModalRef, levelModalRef } from '../refs/modal-refs'
import ExperienceBar from '../ui/ExperienceBar'
import { Flex } from '../ui/Flex'
import Spacer from '../ui/Spacer'
import { Background, levelComponents } from './Levels'

const Wrapper = styled(View)<{ width: number }>`
  height: 250px;
  width: ${(p) => p.width}px;
  overflow: hidden;
  position: relative;
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

const InfoButton = styled(TouchableOpacity)`
  position: absolute;
  top: 0;
  right: 0;
  padding: ${SPACING}px ${SPACING * 1.5}px;
`

const Forest = () => {
  const { windowWidth } = useWindowDimensions()
  const { doMediumFeedback } = useHaptics()
  const { experienceMap, levelMap, setCurrentlyInspectedPlugin } = useLevels()
  const { chosenPlugins } = useOnboarding()

  const adjustedLevelMap = useMemo(() => {
    const newLevelMap = { ...levelMap }
    for (const plugin of chosenPlugins) {
      if (Object.keys(newLevelMap).includes(plugin)) continue
      newLevelMap[plugin] = 0
    }
    return newLevelMap
  }, [chosenPlugins, levelMap])

  return (
    <>
      <Wrapper width={windowWidth}>
        <Background source={require('../../../assets/images/background_small.jpg')} />
        <Scroller horizontal>
          <LevelsContainer row align={'flex-end'}>
            {adjustedLevelMap &&
              Object.keys(adjustedLevelMap).map((key, index) => (
                <LevelContainer key={index} width={130} align={'center'} column>
                  <ExperienceContainer align={'center'} column>
                    <PluginBanner plugin={key as SettingsPluginName} size={30} />
                    <Spacer x={1} />
                    <ExperienceBar
                      progress={(100 / 50) * (experienceMap?.[key as SettingsPluginName] ?? 0)}
                      size={'small'}
                      max={adjustedLevelMap[key] >= 6}
                      center
                    />
                  </ExperienceContainer>
                  <TouchableOpacity
                    onPress={async () => {
                      setCurrentlyInspectedPlugin(key as SettingsPluginName)
                      await doMediumFeedback()
                      levelModalRef.current?.expand()
                    }}>
                    {levelComponents[Math.max(adjustedLevelMap[key], 0)]}
                  </TouchableOpacity>
                </LevelContainer>
              ))}
          </LevelsContainer>
        </Scroller>
        <InfoButton onPress={() => levelExplanationModalRef.current?.expand()}>
          <FontAwesome5 name="question-circle" size={22} color={COLORS.BLACK} />
        </InfoButton>
      </Wrapper>
    </>
  )
}

export default Forest
