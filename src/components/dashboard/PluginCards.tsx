import React, { Fragment, ReactNode } from 'react'
import { ScrollView } from 'react-native'
import styled from 'styled-components'
import { SettingsPluginName } from '../../../api/openapi'
import { useOnboarding } from '../../provider/OnboardingProvider'
import { Heading4 } from '../../theme/typography'
import Spacer from '../ui/Spacer'
import FinanceDetailedBanner from './plugins/FinanceDetailedBanner'
import MeditateDetailedBanner from './plugins/MeditateDetailedBanner'
import RunDetailedBanner from './plugins/RunDetailedBanner'
import { SectionTitleContainer } from './SharedStyles'

const StyledScrollView = styled(ScrollView)`
  width: 100%;
`

const Cards: { [key in SettingsPluginName]: ReactNode } = {
  [SettingsPluginName.PluginNameFinance]: <FinanceDetailedBanner />,
  [SettingsPluginName.PluginNameMeditation]: <MeditateDetailedBanner />,
  [SettingsPluginName.PluginNameElevator]: <RunDetailedBanner />,
}

const PluginCards = () => {
  const { chosenPlugins } = useOnboarding()

  return (
    <Fragment>
      <SectionTitleContainer>
        <Heading4>Your Habits</Heading4>
      </SectionTitleContainer>
      <Spacer x={1} />
      <StyledScrollView horizontal showsHorizontalScrollIndicator={false}>
        {chosenPlugins.map((plugin) => (
          <Fragment key={plugin}>
            <Spacer x={2} />
            {Cards[plugin]}
          </Fragment>
        ))}
        <Spacer x={2} />
      </StyledScrollView>
    </Fragment>
  )
}

export default PluginCards
