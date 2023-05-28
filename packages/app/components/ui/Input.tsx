import { COLORS, OUTER_BORDER_RADIUS, SPACING } from 'app/theme/theme'
import { alpha } from 'axelra-react-native-utilities'
import React, { forwardRef, useState } from 'react'
import { TextInput, TextInputProps } from 'react-native'
import styled from 'styled-components/native'

type InputProps = {
  small?: boolean
  fullWidth?: boolean
  maxWidth?: number
}

type Props = { color?: string; link?: string; minHeight?: number } & InputProps & TextInputProps

const InputField = styled(TextInput)<{
  minHeight?: number
  edit?: boolean
  isFocused?: boolean
}>`
  border: 1.5px solid ${(p) => alpha(p.edit ? (p.isFocused ? 0.8 : 0.3) : 0.3, COLORS.SECONDARY)};
  border-radius: ${OUTER_BORDER_RADIUS}px;
  padding: ${SPACING * 1.5}px;
  font-size: 18px;
  flex: 1;
  min-height: ${(p) => p.minHeight ?? 0}px;
`

const Input = forwardRef<TextInput, Props>(
  ({ small, minHeight, fullWidth, maxWidth, editable = true, ...rest }, ref) => {
    const [isFocused, setIsFocused] = useState(false)

    return (
      <InputField
        placeholderTextColor={alpha(editable ? 0.3 : 0.1, COLORS.BLACK)}
        minHeight={minHeight}
        isFocused={isFocused}
        ref={ref}
        {...rest}
        edit={editable}
        onFocus={() => {
          editable && setIsFocused(true)
        }}
        onBlur={() => {
          setIsFocused(false)
        }}
      />
    )
  }
)

export default Input
