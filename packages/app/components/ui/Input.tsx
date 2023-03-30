import { useWindowDimensions } from 'app/hooks/useWindowDimensions'
import { COLORS, IO_COMPONENT_WIDTH_PERCENT, OUTER_BORDER_RADIUS, SPACING } from 'app/theme/theme'
import React, { useMemo } from 'react'
import { TextInput, TextInputProps } from 'react-native'
import styled from 'styled-components/native'

type InputProps = {
  small?: boolean
  fullWidth?: boolean
  maxWidth?: number
}

type Props = { color?: string; link?: string } & InputProps & TextInputProps

const InputField = styled(TextInput)<{ maxWidth: number }>`
  border: 1px solid ${COLORS.PRIMARY};
  border-radius: ${OUTER_BORDER_RADIUS}px;
  padding: ${SPACING * 2}px ${SPACING * 2}px;
  max-width: ${(p) => p.maxWidth}px;
  min-width: ${(p) => p.maxWidth}px;
  font-size: 16px;
`

const Input = ({ small, fullWidth, maxWidth, ...rest }: Props) => {
  const { windowWidth } = useWindowDimensions()
  const width = useMemo(() => maxWidth ?? windowWidth * IO_COMPONENT_WIDTH_PERCENT, [])
  return <InputField maxWidth={width} {...rest} />
}

export default Input
