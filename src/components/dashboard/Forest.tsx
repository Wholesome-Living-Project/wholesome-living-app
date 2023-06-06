import React, { Fragment, useMemo } from 'react'
import { ScrollView, TouchableOpacity, View } from 'react-native'
import styled from 'styled-components'
import { SettingsPluginName } from '../../../api/openapi'
import { PLUGINS } from '../../helpers/pluginList'
import useHaptics from '../../hooks/useHaptics'
import { useWindowDimensions } from '../../hooks/useWindowDimensions'
import { IO_COMPONENT_WIDTH_PERCENT, SPACING } from '../../theme/theme'
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
            {levels.map((level, index) => (
              <LevelContainer key={index} width={130} align={'center'} column>
                <ExperienceContainer align={'center'} column>
                  <PluginBanner
                    plugin={SettingsPluginName.PluginNameMeditation}
                    title={''}
                    size={30}
                    icon={PLUGINS[SettingsPluginName.PluginNameMeditation].icon}
                  />
                  <Spacer x={0.5} />
                  <ExperienceBar progress={20} size={'small'} />
                </ExperienceContainer>
                <TouchableOpacity
                  onPress={async () => {
                    await doMediumFeedback()
                    levelModalRef.current?.expand()
                  }}>
                  {levelComponents[level - 1]}
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
