import React from 'react'
import styled from 'styled-components/native'
import { SPACING } from '../theme'

const SpacingView = styled.View<{ x }>`
  height: ${(p) => p.x * SPACING}px;
  width: ${(p) => p.x * SPACING}px;
`
type Props = { x: number }
const Spacer = ({ x }: Props) => {
  return <SpacingView x={x} />
}

export default Spacer
