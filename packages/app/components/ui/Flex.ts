import { FlexProps, makeFlexCSS } from 'axelra-react-native-flex'
import { View, ViewProps } from 'react-native'
import styled from 'styled-components'

export const Flex = styled(View)<FlexProps & ViewProps>`
  ${({ ...props }) => makeFlexCSS(props)};
`
