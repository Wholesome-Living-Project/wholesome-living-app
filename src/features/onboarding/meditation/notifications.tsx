import React from 'react'
import { Switch, View } from 'react-native'
import { Divider } from 'react-native-elements'
import styled from 'styled-components'
import { SettingsPluginName } from '../../../../api/openapi'
import OnboardingStep from '../../../components/onboarding/OnboardingStep'
import { Flex } from '../../../components/ui/Flex'
import Spacer from '../../../components/ui/Spacer'
import { useOnboarding } from '../../../provider/OnboardingProvider'
import { COLORS, OUTER_BORDER_RADIUS, SPACING } from '../../../theme/theme'
import { Heading4, Light, Regular } from '../../../theme/typography'

const NotificationOption = styled(Flex)`
  padding: ${SPACING}px ${SPACING * 2}px;
  border-radius: ${OUTER_BORDER_RADIUS}px;
  background: ${COLORS.BACKGROUND_GREY};
  margin-bottom: ${SPACING}px;
`

const Notifications = () => {
  const { meditateReminderNotification, setMeditateReminderNotification, setMeditationSettings } =
    useOnboarding()

  return (
    <OnboardingStep
      primaryText={'Continue'}
      plugin={SettingsPluginName.PluginNameMeditation}
      onPressPrimary={() => {
        setMeditationSettings()
      }}>
      <View>
        <Heading4>Notifications</Heading4>
        <Light>Get a push notification when it is time to meditate</Light>
        <Spacer x={1} />
        <Divider />
        <Spacer x={2} />
        <NotificationOption row justify={'space-between'}>
          <Regular color={COLORS.PRIMARY}>Remind me to meditate</Regular>
          <Switch
            value={meditateReminderNotification}
            onChange={() => {
              /*if (!meditateReminderNotification)
                schedulePushNotification(
                  'Meditate',
                  'It is time to meditate',
                  { data: '' },
                  {
                    hour: 0,
                    minute: 0,
                    seconds: 1,
                  }
                )*/
              setMeditateReminderNotification(!meditateReminderNotification)
            }}
          />
        </NotificationOption>
      </View>
    </OnboardingStep>
  )
}

export default Notifications
