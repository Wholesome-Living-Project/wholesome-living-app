import FinanceDetailedBanner from 'app/components/dashboard/plugins/FinanceDetailedBanner'
import MeditateDetailedBanner from 'app/components/dashboard/plugins/MeditateDetailedBanner'
import RunDetailedBanner from 'app/components/dashboard/plugins/RunDetailedBanner'
import { SectionTitleContainer } from 'app/components/dashboard/SharedStyles'
import Spacer from 'app/components/ui/Spacer'
import { Heading4 } from 'app/theme/typography'
import React, { Fragment } from 'react'
import { ScrollView } from 'react-native'

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
