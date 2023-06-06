import * as Haptics from 'expo-haptics'
import React from 'react'

// Use these hook to trigger haptic feedback
const UseHaptics = () => {
  const doSuccessFeedback = React.useCallback(async () => {
    await Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success)
  }, [])

  const doWarningFeedback = React.useCallback(async () => {
    await Haptics.notificationAsync(Haptics.NotificationFeedbackType.Warning)
  }, [])

  const doErrorFeedback = React.useCallback(async () => {
    await Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error)
  }, [])

  const doHeavyFeedback = React.useCallback(async () => {
    await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy)
  }, [])

  const doMediumFeedback = React.useCallback(async () => {
    await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium)
  }, [])

  const doLightFeedback = React.useCallback(async () => {
    await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light)
  }, [])

  return {
    doSuccessFeedback,
    doLightFeedback,
    doErrorFeedback,
    doHeavyFeedback,
    doMediumFeedback,
    doWarningFeedback,
  }
}

export default UseHaptics
