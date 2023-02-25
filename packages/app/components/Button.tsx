import { Heading6 } from 'app/theme/typography'
import React, { PropsWithChildren } from 'react'
import { View, ViewProps } from 'react-native'
import { MotiLink } from 'solito/moti'
import styled from 'styled-components/native'
import { SPACING, __COLORS } from '../theme/theme'

type ButtonType = 'cta' | 'primary' | 'secondary'

type ButtonProps = { small?: boolean; buttonType?: ButtonType }

type Props = { color?: string; link?: string } & ButtonProps & PropsWithChildren & ViewProps

const StyledButton = styled(View)<ButtonProps>`
  display: flex;
  flex-direction: row;
  min-width: 200px;

  background-color: ${(p) =>
    p.buttonType === 'cta'
      ? __COLORS.CTA
      : p.buttonType === 'secondary'
      ? __COLORS.SECONDARY
      : __COLORS.PRIMARY};

  padding: ${(p) => (p.small ? SPACING : SPACING * 2)}px;
  border-radius: ${SPACING}px;
  justify-content: center;
`

const StyledText = styled(Heading6)<{ color?: string; buttonType?: string }>`
  color: ${(p) =>
    p.color ? p.color : p.buttonType === 'secondary' ? __COLORS.PRIMARY : __COLORS.WHITE};
  text-align: center;
`

const Button = ({ small, color, link, buttonType, children, ...rest }: Props) => {
  return (
    <MotiLink
      href={link ? link : ''}
      animate={({ pressed }) => {
        'worklet'
        return {
          scale: pressed ? 0.9 : 1,
        }
      }}
      from={{
        scale: 1,
      }}
      transition={{
        type: 'timing',
        duration: 100,
      }}>
      <StyledButton small={small} buttonType={buttonType} {...rest}>
        <StyledText color={color} buttonType={buttonType}>
          {children}
        </StyledText>
      </StyledButton>
    </MotiLink>
  )
}

export default Button
