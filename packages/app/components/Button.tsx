import React, { PropsWithChildren } from 'react'
import styled from 'styled-components/native'
import { SPACING, __COLORS } from '../theme/theme'

type ButtonType = 'cta' | 'primary' | 'secondary'

type ButtonProps = { small?: boolean; buttonType?: ButtonType }

type Props = { color?: string } & ButtonProps & PropsWithChildren

const StyledButton = styled.View<ButtonProps>`
  display: flex;
  flex-direction: row;
  gap: ${SPACING / 2}px;

  background: ${(p) =>
    p.buttonType === 'cta'
      ? __COLORS.CTA
      : p.buttonType === 'secondary'
      ? __COLORS.SECONDARY
      : __COLORS.PRIMARY};

  padding: ${(p) => (p.small ? SPACING : SPACING * 2)}px;
  border-radius: ${SPACING}px;
`

const StyledText = styled.Text<{ color?: string; buttonType?: string }>`
  color: ${(p) =>
    p.color ? p.color : p.buttonType === 'secondary' ? __COLORS.PRIMARY : __COLORS.WHITE};
`

const Button = ({ small, color, buttonType, children }: Props) => {
  return (
    <StyledButton small={small} buttonType={buttonType}>
      <StyledText color={color} buttonType={buttonType}>
        {children}
      </StyledText>
    </StyledButton>
  )
}

export default Button
