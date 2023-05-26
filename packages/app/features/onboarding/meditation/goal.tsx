import DateTimePicker from '@react-native-community/datetimepicker'
import { Picker } from '@react-native-picker/picker'
import OnboardingStep from 'app/components/onboarding/OnboardingStep'
import { Flex } from 'app/components/ui/Flex'
import Spacer from 'app/components/ui/Spacer'
import { plugins } from 'app/helpers/pluginList'
import { useOnboarding } from 'app/provider/OnboardingProvider'
import { Heading4, Light } from 'app/theme/typography'
import React from 'react'
import { View } from 'react-native'
import { Divider } from 'react-native-elements'
import styled from 'styled-components'

const StyledPicker = styled(Picker)`
  width: 150px;
`
const Goal = () => {
  const {
    setSelectedGoalTime,
    selectedGoalNumber,
    selectedGoalPeriod,
    setSelectedGoalNumber,
    setSelectedGoalPeriod,
    selectedGoalTime,
  } = useOnboarding()

  return (
    <OnboardingStep primaryText={'Continue'} plugin={plugins.MEDITATE} onPressPrimary={() => {}}>
      <View>
        <Heading4>Choose your goal</Heading4>
        <Light>
          I want to meditate every{' '}
          <Light weight={'600'}>
            {selectedGoalNumber}{' '}
            {selectedGoalNumber === 1 ? selectedGoalPeriod.slice(0, -1) : selectedGoalPeriod}
          </Light>
        </Light>
        <Flex row justify={'center'}>
          <StyledPicker
            selectedValue={selectedGoalNumber}
            onValueChange={(itemValue: number) => setSelectedGoalNumber(itemValue)}>
            <Picker.Item label="1" value={1} />
            <Picker.Item label="2" value={2} />
            <Picker.Item label="3" value={3} />
            <Picker.Item label="4" value={4} />
            <Picker.Item label="5" value={5} />
            <Picker.Item label="6" value={6} />
            <Picker.Item label="7" value={7} />
            <Picker.Item label="8" value={8} />
            <Picker.Item label="9" value={9} />
          </StyledPicker>
          <StyledPicker
            selectedValue={selectedGoalPeriod}
            onValueChange={(itemValue: string) => setSelectedGoalPeriod(itemValue)}>
            <Picker.Item label={selectedGoalNumber === 1 ? 'Day' : 'Days'} value="days" />
            <Picker.Item label={selectedGoalNumber === 1 ? 'Week' : 'Weeks'} value="weeks" />
            <Picker.Item label={selectedGoalNumber === 1 ? 'Month' : 'Months'} value="months" />
          </StyledPicker>
        </Flex>
        <Divider />
        <Spacer x={3} />
        <Light>
          I want to start with{' '}
          {selectedGoalTime && (
            <Light weight={'600'}>
              {new Date(selectedGoalTime).getHours()}{' '}
              {new Date(selectedGoalTime).getHours() === 1 ? 'hour' : 'hours'} and{' '}
              {new Date(selectedGoalTime).getMinutes()}{' '}
              {new Date(selectedGoalTime).getMinutes() === 1 ? 'minute' : 'minutes'}
            </Light>
          )}
        </Light>
        <DateTimePicker
          mode={'countdown'}
          value={new Date(selectedGoalTime)}
          display={'spinner'}
          onChange={(_, date) => setSelectedGoalTime(date?.getTime() ?? new Date().getTime())}
        />
      </View>
    </OnboardingStep>
  )
}

export default Goal
