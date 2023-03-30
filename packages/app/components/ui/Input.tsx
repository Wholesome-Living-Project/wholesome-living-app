import { COLORS, OUTER_BORDER_RADIUS, SPACING } from 'app/theme/theme'
import React, { PropsWithChildren } from 'react'
import { TextInputProps } from 'react-native'
import styled from 'styled-components/native'

type InputProps = {
  small?: boolean
  fullWidth?: boolean
  maxWidth?: number
}

type Props = { color?: string; link?: string } & InputProps & PropsWithChildren & TextInputProps

const InputField = styled.TextInput`
  border: 1px solid ${COLORS.PRIMARY};
  border-radius: ${OUTER_BORDER_RADIUS}px;
  padding: ${SPACING}px ${SPACING * 2}px;
  min-width: 200px;
`

const Input = ({ small, fullWidth, maxWidth, children, ...rest }: Props) => {
  return <InputField {...rest}>{children}</InputField>
}

export default Input
