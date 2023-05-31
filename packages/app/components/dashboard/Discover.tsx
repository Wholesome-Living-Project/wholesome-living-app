import { SectionTitleContainer } from 'app/components/dashboard/SharedStyles'
import Plugin from 'app/components/discover/Plugin'
import Spacer from 'app/components/ui/Spacer'
import { PLUGINS, PluginType } from 'app/helpers/pluginList'
import { useUser } from 'app/hooks/useUser'
import { Heading4 } from 'app/theme/typography'
import React, { Fragment } from 'react'
import { FlatList } from 'react-native'
import { UserPluginName } from '../../../api/openapi'

const Discover = () => {
  const { user } = useUser()

  return (
    <Fragment>
      <SectionTitleContainer>
        <Heading4>Explore Plugins</Heading4>
      </SectionTitleContainer>

      <FlatList
        data={Object.values(PLUGINS).filter(
          (plugin: PluginType) => !user?.plugins?.includes(plugin?.plugin as UserPluginName)
        )}
        horizontal
        showsHorizontalScrollIndicator={false}
        renderItem={({ item }) => (
          <Fragment>
            <Spacer x={2} />
            <Plugin plugin={item} />
            <Spacer x={0.5} />
          </Fragment>
        )}
      />
    </Fragment>
  )
}

export default Discover
