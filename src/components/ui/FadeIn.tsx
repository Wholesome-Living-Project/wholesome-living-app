import type { FlexProps } from 'axelra-react-native-flex'
import React, { PropsWithChildren } from 'react'
import { useFadeIn } from '../../hooks/useFadeIn'
import { AnimatedFlex } from './AnimatedFlex'

type Props = {
  duration?: number
} & FlexProps &
  PropsWithChildren

export const FadeIn: React.FC<Props> = ({ children, duration, ...other }) => {
  const { style: opacityStyle } = useFadeIn(duration)
  return (
    <AnimatedFlex {...other} style={[opacityStyle]}>
      {children}
    </AnimatedFlex>
  )
}
