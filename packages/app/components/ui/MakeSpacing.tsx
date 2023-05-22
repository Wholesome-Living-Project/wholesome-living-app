import Spacer from 'app/components/ui/Spacer'
import React from 'react'
import styled from 'styled-components/native'
import { SPACING } from '../../theme/theme'

const SpacingView = styled.View<{ x?: number; y?: number }>`
  height: ${(p) => (p.y ? p.y * SPACING : 1)}px;
  width: ${(p) => (p.x ? p.x * SPACING : 1)}px;
`
type Props = { x?: number; y?: number }
const MakeSpacing = ({ x, y }: Props) => {
  return <SpacingView y={y} x={x} />
}

export default Spacer
