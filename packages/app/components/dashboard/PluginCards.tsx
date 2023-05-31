import FinanceDetailedBanner from 'app/components/dashboard/plugins/FinanceDetailedBanner'
import MeditateDetailedBanner from 'app/components/dashboard/plugins/MeditateDetailedBanner'
import RunDetailedBanner from 'app/components/dashboard/plugins/RunDetailedBanner'
import { SectionTitleContainer } from 'app/components/dashboard/SharedStyles'
import Spacer from 'app/components/ui/Spacer'
import { useUser } from 'app/hooks/useUser'
import { Heading4 } from 'app/theme/typography'
import React, { Fragment } from 'react'
import { ScrollView } from 'react-native'

const PluginCards = () => {
  const { user } = useUser()

  return (
    <Fragment>
      <SectionTitleContainer>
        <Heading4>Your Plugins</Heading4>
      </SectionTitleContainer>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        {user?.plugins?.includes('meditation') ? (
          <>
            <Spacer x={2} />
            <MeditateDetailedBanner />
          </>
        ) : (
          <></>
        )}
        {user?.plugins?.includes('finance') ? (
          <>
            <Spacer x={2} />
            <FinanceDetailedBanner />
          </>
        ) : (
          <></>
        )}
        {user?.plugins?.includes('elevator') ? (
          <>
            <Spacer x={2} />
            <RunDetailedBanner />
          </>
        ) : (
          <></>
        )}
        <Spacer x={2} />
      </ScrollView>
    </Fragment>
  )
}

export default PluginCards
