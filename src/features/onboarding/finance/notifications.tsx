import { Picker } from '@react-native-picker/picker'
import React from 'react'
import { Switch, View } from 'react-native'
import { Divider } from 'react-native-elements'
import styled from 'styled-components'
import { SettingsNotificationType, SettingsPluginName } from '../../../../api/openapi'
import OnboardingStep from '../../../components/onboarding/OnboardingStep'
import { Flex } from '../../../components/ui/Flex'
import Spacer from '../../../components/ui/Spacer'
import { useOnboarding } from '../../../provider/OnboardingProvider'
import { COLORS, OUTER_BORDER_RADIUS, SPACING } from '../../../theme/theme'
import { Heading4, Light, Regular } from '../../../theme/typography'

const NotificationOption = styled(Flex)`
  padding: ${SPACING}px ${SPACING * 2}px;
  border-radius: ${OUTER_BORDER_RADIUS}px;
  background: ${COLORS.WHITE};
  margin-bottom: ${SPACING}px;
`

const StyledPicker = styled(Picker)`
  width: 150px;
`

const Notifications = () => {
  const {
    financeSaveReminderNotification,
    setFinanceSaveReminderNotification,
    setFinanceSettings,
    notificationPeriod,
    setNotificationPeriod,
    notificationFrequency,
    setNotificationFrequency,
  } = useOnboarding()

  return (
    <OnboardingStep
      primaryText={'Continue'}
      plugin={SettingsPluginName.PluginNameFinance}
      onPressPrimary={() => {
        setFinanceSettings()
      }}>
      <View>
        <Heading4>Notifications</Heading4>
        <Light>Get a push notification when it is time to save money</Light>
        <Spacer x={1} />
        <Divider />
        <Spacer x={2} />
        <NotificationOption row justify={'space-between'}>
          <Regular color={COLORS.PRIMARY}>Remind me to save</Regular>
          <Switch
            value={financeSaveReminderNotification}
            onChange={() => {
              setFinanceSaveReminderNotification(!financeSaveReminderNotification)
            }}
          />
        </NotificationOption>
        <Light>
          I want to be reminded to save every{' '}
          <Light weight={'600'}>
            {notificationFrequency}{' '}
            {notificationFrequency === 1 ? notificationPeriod.slice(0, -1) : notificationPeriod}
          </Light>
        </Light>
        <NotificationOption row justify={'space-between'}>
          <Flex justify={'space-between'} column>
            <Regular color={COLORS.PRIMARY}>Remind me to save</Regular>
            <Flex row>
              <StyledPicker
                selectedValue={notificationFrequency}
                onValueChange={(itemValue: number) => setNotificationFrequency(itemValue)}>
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
                selectedValue={notificationPeriod}
                onValueChange={(itemValue: SettingsNotificationType) =>
                  setNotificationPeriod(itemValue)
                }>
                <Picker.Item label={notificationFrequency === 1 ? 'Day' : 'Days'} value="Days" />
                <Picker.Item label={notificationFrequency === 1 ? 'Week' : 'Weeks'} value="Weeks" />
                <Picker.Item label={notificationFrequency === 1 ? 'Month' : 'Months'} value="Months" />
              </StyledPicker>
            </Flex>
          </Flex>
        </NotificationOption>
        <Spacer x={6} />
      </View>
    </OnboardingStep>
  )
}

export default Notifications
