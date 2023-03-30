import { COLORS, OUTER_BORDER_RADIUS, SPACING } from 'app/theme/theme'
import { alpha } from 'axelra-react-native-utilities'
import React from 'react'
import { TextInput, TextInputProps } from 'react-native'
import styled from 'styled-components/native'

type InputProps = {
  small?: boolean
  fullWidth?: boolean
  maxWidth?: number
}

type Props = { color?: string; link?: string } & InputProps & TextInputProps

const InputField = styled(TextInput)`
  border: 1px solid ${alpha(0.5, COLORS.PRIMARY)};
  border-radius: ${OUTER_BORDER_RADIUS}px;
  padding: ${SPACING * 2}px ${SPACING * 2}px;
  font-size: 18px;
  flex: 1;
`

const Input = ({ small, fullWidth, maxWidth, ...rest }: Props) => {
  return <InputField placeholderTextColor={alpha(0.5, COLORS.PRIMARY)} {...rest} />
}

export default Input
