import React, { Fragment, useCallback } from 'react'
import { Text } from 'react-native'
import { Divider } from 'react-native-elements'
import styled from 'styled-components'
import { SettingsPluginName } from '../../../api/openapi'
import Plugin from '../../components/discover/Plugin'
import OnboardingStep from '../../components/onboarding/OnboardingStep'
import { Flex } from '../../components/ui/Flex'
import Spacer from '../../components/ui/Spacer'
import { PLUGINS } from '../../helpers/pluginList'
import { useAuthentication } from '../../provider/AuthenticationProvider'
import { useOnboarding } from '../../provider/OnboardingProvider'
import { COLORS } from '../../theme/theme'
import { Heading4, Light } from '../../theme/typography'

const OpacityWrapper = styled(Flex)<{ active: boolean }>`
  opacity: ${(p) => (p.active ? 1 : 0.3)};
`

const ChosenIndicator = styled(Flex)`
  position: absolute;
  top: -5px;
  right: -5px;
  background-color: ${COLORS.CTA};
  border-radius: 100px;
  width: 25px;
  height: 25px;
`

const IndicatorNumber = styled(Text)`
  font-size: 12px;
  color: ${COLORS.WHITE};
`

const ChoosePlugins = () => {
  const { chosenPlugins, setChosenPlugins, setChosenPluginSteps, chosenPluginSteps } =
    useOnboarding()

  const { patchUser } = useAuthentication()

  const addPlugin = useCallback(
    (plugin: SettingsPluginName) => {
      const route = PLUGINS[plugin].onboardingRoute
      const steps = PLUGINS[plugin].onboardingSubRoutes
      const stepArray = steps?.map((step) => route + '/' + step)

      setChosenPlugins([...chosenPlugins, plugin])
      stepArray && setChosenPluginSteps([...chosenPluginSteps, ...stepArray])
    },
    [chosenPluginSteps, chosenPlugins, setChosenPluginSteps, setChosenPlugins]
  )

  const removePlugin = useCallback(
    (plugin: string) => {
      const route = PLUGINS[plugin].onboardingRoute
      const steps = PLUGINS[plugin].onboardingSubRoutes
      const stepArray = steps?.map((step) => route + '/' + step)

      const newChosenPluginSteps = chosenPluginSteps.filter((step) => !stepArray?.includes(step))

      setChosenPlugins(chosenPlugins.filter((p) => p !== plugin))
      setChosenPluginSteps(newChosenPluginSteps)
    },
    [chosenPluginSteps, chosenPlugins, setChosenPluginSteps, setChosenPlugins]
  )

  const setPlugins = useCallback(async () => {
    console.log('chosen:', chosenPlugins)
    await patchUser({
      plugins: chosenPlugins,
    })
  }, [chosenPlugins, patchUser])

  console.log({ chosenPluginSteps, chosenPlugins })

  return (
    <OnboardingStep
      primaryText={'Continue'}
      primaryDisabled={chosenPlugins.length === 0}
      canSkip={false}
      nextStep={chosenPluginSteps[0]}
      onPressPrimary={setPlugins}>
      <Flex>
        <Spacer x={5} />
        <Heading4>Choose your Plugins</Heading4>
        <Light>Choose the plugins you want to create habits with</Light>
        <Spacer x={1} />
        <Divider />
        <Spacer x={2} />
        <Flex row wrap={'wrap'} align={'center'}>
          {Object.values(PLUGINS).map(
            (plugin) =>
              plugin.plugin && (
                <Fragment key={plugin.title}>
                  <Flex>
                    <OpacityWrapper active={chosenPlugins?.includes(plugin.plugin)}>
                      <Plugin
                        plugin={plugin.plugin}
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
