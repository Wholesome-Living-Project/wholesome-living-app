import type { FlexProps } from 'axelra-react-native-flex'
import { makeFlexCSS } from 'axelra-react-native-flex'
import Animated from 'react-native-reanimated'
import styled from 'styled-components'

export const AnimatedFlex = styled(Animated.View)<FlexProps>`
  ${({ ...props }) => makeFlexCSS(props)};
`
