import { useMemo } from 'react'
import {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withTiming,
} from 'react-native-reanimated'
import { useEffectOnce } from './useEffectOnce'

export const useFadeIn = (duration?: number, delay?: number) => {
  const opacity = useSharedValue(0)

  const style = useAnimatedStyle(() => {
    return {
      opacity: opacity.value,
    }
  })

  useEffectOnce(() => {
    opacity.value = 0
    const timeout = setTimeout(() => {
      opacity.value = duration ? withTiming(1, { duration, easing: Easing.ease }) : withSpring(1)
    }, delay ?? 0)

    return () => clearTimeout(timeout)
  })

  return useMemo(() => ({ style }), [style])
}
