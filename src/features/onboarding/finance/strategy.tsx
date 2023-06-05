import { Picker } from '@react-native-picker/picker'
import React from 'react'
import { View } from 'react-native'
import { SettingsStrategyType, UserPluginName } from '../../../../api/openapi'
import OnboardingStep from '../../../components/onboarding/OnboardingStep'
import Input from '../../../components/ui/Input'
import Spacer from '../../../components/ui/Spacer'
import { useOnboarding } from '../../../provider/OnboardingProvider'
import { Heading4, Heading5, Light } from '../../../theme/typography'

const Strategy = () => {
  const {
    selectedStrategy,
    setSelectedStrategy,
    roundUpNumber,
    setRoundUpNumber,
    setSavingGoal,
    savingGoal,
  } = useOnboarding()

  return (
    <OnboardingStep
      primaryText={'Continue'}
      plugin={UserPluginName.PluginNameFinance}
      onPressPrimary={() => {}}>
      <View>
        <Heading4>Choose your saving strategy</Heading4>
        <Light>
          Round up your spending to the next chosen multiple and put the difference into your 3a.
          Plus one: save 1 CHF everytime you spend something. Percent: save a fixed percentage of
          all your spendings.
        </Light>
        <Spacer x={1} />
        <Picker
          selectedValue={selectedStrategy}
          onValueChange={(itemValue: SettingsStrategyType) => {
            setSelectedStrategy(itemValue)
            setRoundUpNumber(5)
          }}>
          <Picker.Item label="Round up" value={'Round'} />
          <Picker.Item label="Plus one" value={'Plus'} />
          <Picker.Item label="Percent" value={'Percent'} />
        </Picker>

        {selectedStrategy === 'Round' && (
          <>
            <Light>Round up your spendings to the next multiple of </Light>
            <Picker
              selectedValue={roundUpNumber}
              onValueChange={(itemValue: number) => setRoundUpNumber(itemValue)}>
              <Picker.Item label="5" value={5} />
              <Picker.Item label="10" value={10} />
            </Picker>
          </>
        )}

        {selectedStrategy === 'Percent' && (
          <>
            <Light>How much percent of your spendings do you want to save?</Light>
            <Picker
              selectedValue={roundUpNumber}
              onValueChange={(itemValue: number) => setRoundUpNumber(itemValue)}>
              <Picker.Item label="1 %" value={1} />
              <Picker.Item label="2 %" value={2} />
              <Picker.Item label="3 %" value={3} />
              <Picker.Item label="4 %" value={4} />
              <Picker.Item label="5 %" value={5} />
              <Picker.Item label="7 %" value={7} />
            </Picker>
          </>
        )}

        <Heading5>What is your saving goal?</Heading5>
        <Light>
          Choose how much you want to save per month. You can change this later in the settings.
        </Light>
        <Spacer x={1} />
        <Input
          placeholder={'CHF'}
          keyboardType={'numeric'}
          value={savingGoal || ''}
          onChangeText={(value: string) => {
            setSavingGoal(value)
          }}
        />
        <Spacer x={8} />
      </View>
    </OnboardingStep>
  )
}

export default Strategy
