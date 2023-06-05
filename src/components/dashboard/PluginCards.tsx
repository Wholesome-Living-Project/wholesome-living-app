import React, { Fragment, ReactNode } from 'react'
import { ScrollView } from 'react-native'
import styled from 'styled-components'
import { UserPluginName } from '../../../api/openapi'
import { useUser } from '../../hooks/useUser'
import { Heading4 } from '../../theme/typography'
import Spacer from '../ui/Spacer'
import FinanceDetailedBanner from './plugins/FinanceDetailedBanner'
import MeditateDetailedBanner from './plugins/MeditateDetailedBanner'
import RunDetailedBanner from './plugins/RunDetailedBanner'
import { SectionTitleContainer } from './SharedStyles'

const StyledScrollView = styled(ScrollView)`
  width: 100%;
`

const Cards: { [key in UserPluginName]: ReactNode } = {
  [UserPluginName.PluginNameFinance]: <FinanceDetailedBanner />,
  [UserPluginName.PluginNameMeditation]: <MeditateDetailedBanner />,
  [UserPluginName.PluginNameElevator]: <RunDetailedBanner />,
}

const PluginCards = () => {
  const { user } = useUser()

  return (
    <Fragment>
      <SectionTitleContainer>
        <Heading4>Your Plugins</Heading4>
      </SectionTitleContainer>
      <StyledScrollView horizontal showsHorizontalScrollIndicator={false}>
        {user?.plugins?.map((plugin) => (
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
