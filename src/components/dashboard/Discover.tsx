import React, { Fragment, useMemo } from 'react'
import { FlatList } from 'react-native'
import styled from 'styled-components'
import { SettingsPluginName } from '../../../api/openapi'
import { useOnboarding } from '../../provider/OnboardingProvider'
import { Heading4 } from '../../theme/typography'
import Plugin from '../discover/Plugin'
import Spacer from '../ui/Spacer'
import { SectionTitleContainer } from './SharedStyles'

const StyledList = styled(FlatList)`
  width: 100%;
`

const Discover = () => {
  const { chosenPlugins } = useOnboarding()

  const unexploredPlugins = useMemo(() => {
    return Object.values(SettingsPluginName).filter((p) => !chosenPlugins.includes(p))
  }, [chosenPlugins])

  if (unexploredPlugins.length === 0) return null

  return (
    <Fragment>
      <Spacer x={3} />
      <SectionTitleContainer>
        <Heading4>Explore Plugins</Heading4>
      </SectionTitleContainer>
      <Spacer x={1} />
      <StyledList
        data={unexploredPlugins}
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
