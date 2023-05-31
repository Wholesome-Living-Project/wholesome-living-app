import { Picker } from '@react-native-picker/picker'
import OnboardingStep from 'app/components/onboarding/OnboardingStep'
import Spacer from 'app/components/ui/Spacer'
import { useOnboarding } from 'app/provider/OnboardingProvider'
import { Heading4, Light } from 'app/theme/typography'
import React from 'react'
import { View } from 'react-native'
import { Divider } from 'react-native-elements'
import { UserPluginName } from '../../../../api/openapi'

const Strategy = () => {
  const { selectedStrategy, setSelectedStrategy, roundUpNumber, setRoundUpNumber } = useOnboarding()

  return (
    <OnboardingStep
      primaryText={'Continue'}
      plugin={UserPluginName.PluginNameElevator}
      onPressPrimary={() => {}}>
      <View>
        <Heading4>Choose your saving strategy</Heading4>
        <Light>The strategy you chose defines how we calculate your savings</Light>
        <Spacer x={1} />
        <Divider />
        <Picker
          selectedValue={selectedStrategy}
          onValueChange={(itemValue: string) => setSelectedStrategy(itemValue)}>
          <Picker.Item label="Round up" value={'roundup'} />
          <Picker.Item label="Plus one" value={'plusone'} />
        </Picker>

        {selectedStrategy === 'roundup' && (
          <Picker
            selectedValue={roundUpNumber}
            onValueChange={(itemValue: number) => setRoundUpNumber(itemValue)}>
            <Picker.Item label="to 5" value={5} />
            <Picker.Item label="to 10" value={10} />
          </Picker>
        )}
      </View>
    </OnboardingStep>
  )
}

export default Strategy
