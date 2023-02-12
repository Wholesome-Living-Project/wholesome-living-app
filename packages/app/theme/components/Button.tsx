import React, { PropsWithChildren } from 'react'
import { ViewProps } from 'react-native'
import styled from 'styled-components/native'
import { SPACING, __COLORS } from '../theme'

type ButtonType = 'cta' | 'primary' | 'secondary'

type ButtonProps = { small?: boolean; type?: ButtonType }

type Props = { color?: string } & ButtonProps & PropsWithChildren & ViewProps

const StyledButton = styled.View<ButtonProps>`
  display: flex;
  flex-direction: row;
  gap: ${SPACING / 2}px;

  background: ${(p) =>
    p.type === 'cta'
      ? __COLORS.CTA
      : p.type === 'secondary'
      ? __COLORS.SECONDARY
      : __COLORS.PRIMARY};

  padding: ${(p) => (p.small ? SPACING : SPACING * 2)}px;
  border-radius: ${SPACING}px;
`

const StyledText = styled.Text<{ color: string; type: string }>`
  color: ${(p) => (p.color ? p.color : p.type === 'secondary' ? __COLORS.PRIMARY : __COLORS.WHITE)};
`

const Button = ({ small, color, type, children, ...rest }: Props) => {
  return (
    <StyledButton small={small} type={type} {...rest}>
      <StyledText color={color} type={type}>
        {children}
      </StyledText>
    </StyledButton>
  )
}

export default Button
