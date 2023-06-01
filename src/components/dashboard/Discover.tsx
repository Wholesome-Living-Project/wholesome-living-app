import React, { Fragment } from 'react'
import { FlatList } from 'react-native'
import { PLUGINS, PluginType } from "../../helpers/pluginList";
import { Heading4 } from '../../theme/typography'
import Plugin from '../discover/Plugin'
import Spacer from '../ui/Spacer'
import { SectionTitleContainer } from './SharedStyles'
import { UserPluginName } from "../../../api/openapi";
import { useUser } from "../../hooks/useUser";

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
