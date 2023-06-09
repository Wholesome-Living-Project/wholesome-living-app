import type { TouchableScaleProps } from '@jonny/touchable-scale/lib/typescript/props'
import { BottomSheetView } from 'axelra-react-native-bottom-sheet'
import type { FlexProps } from 'axelra-react-native-flex'
import { makeFlexCSS } from 'axelra-react-native-flex'
import styled from 'styled-components'

export const BottomSheetViewFlex = styled(BottomSheetView)<FlexProps & TouchableScaleProps>`
  ${({ ...props }) => makeFlexCSS(props)};
`
