import Plugin from 'app/components/discover/Plugin'
import OnboardingStep from 'app/components/onboarding/OnboardingStep'
import { Flex } from 'app/components/ui/Flex'
import Spacer from 'app/components/ui/Spacer'
import { plugins, PLUGINS } from 'app/helpers/pluginList'
import { useOnboarding } from 'app/provider/OnboardingProvider'
import { COLORS } from 'app/theme/theme'
import { Heading4 } from 'app/theme/typography'
import React, { Fragment, useCallback } from 'react'
import { Text } from 'react-native'
import styled from 'styled-components'

const OpacityWrapper = styled(Flex)<{ active: boolean }>`
  opacity: ${(p) => (p.active ? 1 : 0.3)};
`

const ChosenIndicator = styled(Flex)`
  position: absolute;
  top: -5px;
  right: -5px;
  background-color: ${COLORS.CTA};
  border-radius: 50%;
  width: 25px;
  height: 25px;
`

const IndicatorNumber = styled(Text)`
  font-size: 12px;
  color: ${COLORS.WHITE};
`

const ChoosePlugins = () => {
  const { chosenPlugins, setChosenPlugins } = useOnboarding()

  const addPlugin = useCallback(
    (plugin: plugins) => {
      setChosenPlugins([...chosenPlugins, plugin])
    },
    [chosenPlugins, setChosenPlugins]
  )

  const removePlugin = useCallback(
    (plugin: string) => {
      setChosenPlugins(chosenPlugins.filter((p) => p !== plugin))
    },
    [chosenPlugins, setChosenPlugins]
  )

  return (
    <OnboardingStep primaryText={'Continue'} primaryDisabled={chosenPlugins.length === 0}>
      <Flex>
        <Heading4>Choose your Plugins</Heading4>
        <Spacer x={3} />
        <Flex row wrap={'wrap'} align={'center'}>
          {Object.values(PLUGINS).map(
            (plugin) =>
              plugin.plugin && (
                <Fragment key={plugin.title}>
                  <Flex>
                    <OpacityWrapper active={chosenPlugins?.includes(plugin.plugin)}>
                      <Plugin
                        plugin={plugin}
                        onPress={() =>
                          plugin.plugin &&
                          (chosenPlugins?.includes(plugin.plugin)
                            ? removePlugin(plugin.plugin)
                            : addPlugin(plugin.plugin))
                        }
                      />
                      {chosenPlugins?.includes(plugin.plugin) && (
                        <ChosenIndicator justify={'center'} align={'center'}>
                          <IndicatorNumber>
                            {chosenPlugins.findIndex((t) => plugin.plugin === t) + 1}
                          </IndicatorNumber>
                        </ChosenIndicator>
                      )}
                    </OpacityWrapper>
                    <Spacer x={2} />
                  </Flex>
                  <Spacer x={2} />
                </Fragment>
              )
          )}
        </Flex>
      </Flex>
    </OnboardingStep>
  )
}

export default ChoosePlugins
