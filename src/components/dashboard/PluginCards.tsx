import React, { Fragment } from 'react'
import { ScrollView } from 'react-native'
import { Heading4 } from '../../theme/typography'
import Spacer from '../ui/Spacer'
import FinanceDetailedBanner from './plugins/FinanceDetailedBanner'
import MeditateDetailedBanner from './plugins/MeditateDetailedBanner'
import RunDetailedBanner from './plugins/RunDetailedBanner'
import { SectionTitleContainer } from './SharedStyles'
import { useUser } from "../../hooks/useUser";

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
