import React, { Fragment } from 'react'
import { FlatList } from 'react-native'
import styled from 'styled-components'
import { SettingsPluginName } from '../../../api/openapi'
import { useUser } from '../../hooks/useUser'
import { Heading4 } from '../../theme/typography'
import Plugin from '../discover/Plugin'
import Spacer from '../ui/Spacer'
import { SectionTitleContainer } from './SharedStyles'

const StyledList = styled(FlatList)`
  width: 100%;
`

const Discover = () => {
  const { user } = useUser()

  return (
    <Fragment>
      <SectionTitleContainer>
        <Heading4>Explore Plugins</Heading4>
      </SectionTitleContainer>
      <Spacer x={2} />
      <StyledList
        data={Object.values(SettingsPluginName)}
        horizontal
        showsHorizontalScrollIndicator={false}
        renderItem={({ item }) => (
          <Fragment>
            <Spacer x={2} />
            <Plugin plugin={item as SettingsPluginName} />
            <Spacer x={0.5} />
          </Fragment>
        )}
      />
    </Fragment>
  )
}

export default Discover
