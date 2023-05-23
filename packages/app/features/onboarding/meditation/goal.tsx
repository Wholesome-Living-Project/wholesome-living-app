import OnboardingStep from 'app/components/onboarding/OnboardingStep'
import { plugins } from 'app/helpers/pluginList'
import { Heading4 } from 'app/theme/typography'
import React from 'react'
import { View } from 'react-native'

const Goal = () => {
  return (
    <OnboardingStep primaryText={'Continue'} plugin={plugins.MEDITATE}>
      <View>
        <Heading4>Choose your goal</Heading4>
      </View>
    </OnboardingStep>
  )
}

export default Goal
