import DateTimePicker from '@react-native-community/datetimepicker'
import { Picker } from '@react-native-picker/picker'
import React, { useCallback, useState } from 'react'
import { Platform, View } from 'react-native'
import styled from 'styled-components'
import { SettingsPluginName } from '../../../../api/openapi'
import { SettingsNotificationType } from '../../../../api/openapi'
import OnboardingStep from '../../../components/onboarding/OnboardingStep'
import { Flex } from '../../../components/ui/Flex'
import Spacer from '../../../components/ui/Spacer'
import { useOnboarding } from '../../../provider/OnboardingProvider'
import { COLORS, EXTRA_COLORS, OUTER_BORDER_RADIUS } from '../../../theme/theme'
import { Heading4, Heading5, Light } from '../../../theme/typography'
import Slider from '@react-native-community/slider';
import { formatTimeMeditation } from '../../../helpers/formatTimeMeditation'

const StyledPicker = styled(Picker)`
  width: 150px
`
const PickerBackground = styled(Flex)`
  background: ${COLORS.BACKGROUND_GREY};
  border-radius: ${OUTER_BORDER_RADIUS}px;
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

  const [sliderValue, setSliderValue] = useState(3)

  return (
    <OnboardingStep
      primaryText={'Continue'}
      plugin={SettingsPluginName.PluginNameMeditation}
      onPressPrimary={() => {}}>
      <View>
        <Heading4>Choose your goal</Heading4>
        <Light>
          I want to meditate every{' '}
          <Light weight={'600'}>
            {selectedGoalNumber}{' '}
            {selectedGoalNumber === 1 ? selectedGoalPeriod.slice(0, -1) : selectedGoalPeriod}
          </Light>
        </Light>
        <PickerBackground row justify={'center'}>
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
            onValueChange={(itemValue: SettingsNotificationType) =>
              setSelectedGoalPeriod(itemValue)
            }>
            <Picker.Item label={selectedGoalNumber === 1 ? 'Day' : 'Days'} value="Day" />
            <Picker.Item label={selectedGoalNumber === 1 ? 'Week' : 'Weeks'} value="Week" />
            <Picker.Item label={selectedGoalNumber === 1 ? 'Month' : 'Months'} value="Month" />
          </StyledPicker>
        </PickerBackground>
        <Spacer x={3} />
        <Light>
          I want to start with{' '}
          {Platform.OS === "ios" ?
            selectedGoalTime && (
              <Light weight={'600'}>
                {new Date(selectedGoalTime).getHours() > 0 && new Date(selectedGoalTime).getHours()}{' '}
                {new Date(selectedGoalTime).getHours() > 0 &&
                  (new Date(selectedGoalTime).getHours() === 1 ? 'hour and ' : 'hours and ')}
                {new Date(selectedGoalTime).getMinutes() > 0 &&
                  new Date(selectedGoalTime).getMinutes()}{' '}
                {new Date(selectedGoalTime).getMinutes() > 0 &&
                  (new Date(selectedGoalTime).getMinutes() === 1 ? 'minute' : 'minutes')}
              </Light>
            )
            :
            <Heading5>{" " + formatTimeMeditation(sliderValue)}</Heading5>
          }
        </Light>
        <PickerBackground>
          {Platform.OS === "ios" ?
            <DateTimePicker
              mode={'countdown'}
              textColor={COLORS.BLACK}
              value={new Date(selectedGoalTime)}
              display={'spinner'}
              onChange={(_, date) => setSelectedGoalTime(date?.getTime() ?? new Date().getTime())}
            /> :
            <Slider
              style={{ width: "100%", height: 50 }}
              minimumValue={1}
              maximumValue={70}
              value={sliderValue}
              step={1}
              onValueChange={setSliderValue}
              onSlidingComplete={setSliderValue}
              thumbTintColor={EXTRA_COLORS.BLUE}
              minimumTrackTintColor={EXTRA_COLORS.BLUE}
              maximumTrackTintColor="#000000"
            />
          }
        </PickerBackground>
        <Spacer x={8} />
      </View>
    </OnboardingStep>
  )
}

export default Goal
