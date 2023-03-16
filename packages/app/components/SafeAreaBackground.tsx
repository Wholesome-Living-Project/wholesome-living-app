import { COLORS, SPACING } from 'app/theme/theme'
import { SafeAreaView } from 'react-native'
import styled from 'styled-components'

export const SafeAreaBackground = styled(SafeAreaView)`
  background: ${COLORS.SECONDARY};
  flex: 1;
  padding: ${SPACING * 4}px;
`
