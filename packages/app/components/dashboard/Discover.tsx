import { SectionTitleContainer } from 'app/components/dashboard/SharedStyles'
import Plugin from 'app/components/discover/Plugin'
import Spacer from 'app/components/ui/Spacer'
import { PLUGINS } from 'app/helpers/pluginList'
import { Heading4 } from 'app/theme/typography'
import React, { Fragment } from 'react'
import { FlatList } from 'react-native'

const Discover = () => {
  return (
    <Fragment>
      <SectionTitleContainer>
        <Heading4>Explore Plugins</Heading4>
      </SectionTitleContainer>
      <FlatList
        data={Object.values(PLUGINS)}
        centerContent
        horizontal
        showsHorizontalScrollIndicator={false}
        renderItem={({ item }) => (
          <Fragment>
            <Spacer x={2} />
            <Plugin plugin={item} />
            <Spacer x={2} />
          </Fragment>
        )}
      />
    </Fragment>
  )
}

export default Discover
