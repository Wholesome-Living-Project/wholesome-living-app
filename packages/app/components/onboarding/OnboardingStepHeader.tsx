import PluginBanner from 'app/components/discover/PluginBanner'
import { Flex } from 'app/components/ui/Flex'
import { PLUGINS, plugins } from 'app/helpers/pluginList'
import { Heading4 } from 'app/theme/typography'
import React, { useMemo } from 'react'

type Props = {
  plugin?: plugins
}

const OnboardingStepHeader = ({ plugin }: Props) => {
  const title = useMemo(() => plugin && PLUGINS[plugin].title, [plugin])

  if (!plugin || !title) return null
  return (
    <Flex row justify={'space-between'} align={'center'}>
      <Heading4>{title}</Heading4>
      <PluginBanner title={title} />
    </Flex>
  )
}

export default OnboardingStepHeader
