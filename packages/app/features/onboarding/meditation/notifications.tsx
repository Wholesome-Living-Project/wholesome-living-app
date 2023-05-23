import OnboardingStep from 'app/components/onboarding/OnboardingStep'
import { Heading4 } from 'app/theme/typography'
import React from 'react'
import { View } from 'react-native'

const Notifications = () => {
  return (
    <OnboardingStep primaryText={'Continue'}>
      <View>
        <Heading4>Choose your notification settings</Heading4>
      </View>
    </OnboardingStep>
  )
}

export default Notifications
