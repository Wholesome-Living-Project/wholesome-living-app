import React, { Fragment } from 'react'
import { ScrollView } from 'react-native'
import { Heading4 } from '../../theme/typography'
import Spacer from '../ui/Spacer'
import FinanceDetailedBanner from './plugins/FinanceDetailedBanner'
import MeditateDetailedBanner from './plugins/MeditateDetailedBanner'
import RunDetailedBanner from './plugins/RunDetailedBanner'
import { SectionTitleContainer } from './SharedStyles'

const PluginCards = () => {
  return (
    <Fragment>
      <SectionTitleContainer>
        <Heading4>Your Plugins</Heading4>
      </SectionTitleContainer>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        <Spacer x={2} />
        <MeditateDetailedBanner />
        <Spacer x={2} />
        <FinanceDetailedBanner />
        <Spacer x={2} />
        <RunDetailedBanner />
        <Spacer x={2} />
      </ScrollView>
    </Fragment>
  )
}

export default PluginCards
