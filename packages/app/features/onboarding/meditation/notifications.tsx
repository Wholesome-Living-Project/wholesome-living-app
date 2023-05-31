import OnboardingStep from 'app/components/onboarding/OnboardingStep'
import { Flex } from 'app/components/ui/Flex'
import Spacer from 'app/components/ui/Spacer'
import { useOnboarding } from 'app/provider/OnboardingProvider'
import { COLORS, OUTER_BORDER_RADIUS, SPACING } from 'app/theme/theme'
import { Heading4, Light, Regular } from 'app/theme/typography'
import React from 'react'
import { Switch, View } from 'react-native'
import { Divider } from 'react-native-elements'
import styled from 'styled-components'
import { UserPluginName } from '../../../../api/openapi'

const NotificationOption = styled(Flex)`
  padding: ${SPACING}px ${SPACING * 2}px;
  border-radius: ${OUTER_BORDER_RADIUS}px;
  background: ${COLORS.WHITE};
  margin-bottom: ${SPACING}px;
`

const Notifications = () => {
  const { meditateReminderNotification, setMeditateReminderNotification } = useOnboarding()

  return (
    <OnboardingStep
      primaryText={'Continue'}
      plugin={UserPluginName.PluginNameMeditation}
      onPressPrimary={() => {}}>
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
