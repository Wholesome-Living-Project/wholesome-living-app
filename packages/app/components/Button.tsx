import { Heading6 } from 'app/theme/typography'
import React, { PropsWithChildren } from 'react'
import { Platform, TouchableOpacity, TouchableOpacityProps } from 'react-native'
import { MotiLink } from 'solito/moti'
import styled from 'styled-components/native'
import { SPACING, __COLORS } from '../theme/theme'

type ButtonType = 'cta' | 'primary' | 'secondary'

type ButtonProps = { small?: boolean; buttonType?: ButtonType }

type Props = { color?: string; link?: string } & ButtonProps &
  PropsWithChildren &
  TouchableOpacityProps

const StyledButton = styled(TouchableOpacity)<ButtonProps>`
  display: flex;
  flex-direction: row;

  background-color: ${(p) =>
    p.buttonType === 'cta'
      ? __COLORS.CTA
      : p.buttonType === 'secondary'
      ? __COLORS.SECONDARY
      : __COLORS.PRIMARY};

  padding: ${(p) => (p.small ? SPACING : SPACING * 1.5)}px
    ${(p) => (p.small ? SPACING : SPACING * 2)}px;
  border-radius: ${SPACING}px;
  justify-content: center;
`

const StyledText = styled(Heading6)<{ color?: string; buttonType?: string }>`
  color: ${(p) =>
    p.color ? p.color : p.buttonType === 'secondary' ? __COLORS.PRIMARY : __COLORS.WHITE};
  text-align: center;
`

const Button = ({ small, color, link, buttonType, children, ...rest }: Props) => {
  return link ? (
    <MotiLink
      href={link}
      animate={({ pressed }) => {
        'worklet'
        return {
          scale: pressed ? (Platform.OS !== 'web' ? 0.95 : 1) : 1,
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
  ) : (
    <StyledButton small={small} buttonType={buttonType} {...rest}>
      <StyledText color={color} buttonType={buttonType}>
        {children}
      </StyledText>
    </StyledButton>
  )
}

export default Button
