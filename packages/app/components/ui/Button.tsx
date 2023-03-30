import { useWindowDimensions } from 'app/hooks/useWindowDimensions'
import { Heading6 } from 'app/theme/typography'
import React, { PropsWithChildren, useMemo } from 'react'
import { Platform, TouchableOpacity, TouchableOpacityProps } from 'react-native'
import { MotiLink } from 'solito/moti'
import styled from 'styled-components/native'
import { COLORS, IO_COMPONENT_WIDTH_PERCENT, SPACING } from '../../theme/theme'

type ButtonType = 'cta' | 'primary' | 'secondary'

type ButtonProps = {
  small?: boolean
  buttonType?: ButtonType
  fullWidth?: boolean
  maxWidth?: number
}

type Props = { color?: string; link?: string } & ButtonProps &
  PropsWithChildren &
  TouchableOpacityProps

const StyledButton = styled(TouchableOpacity)<ButtonProps>`
  display: flex;
  flex-direction: row;
  width: ${(p) => (p.fullWidth ? `${p.maxWidth}px` : 'auto')}

  background-color: ${(p) =>
    p.buttonType === 'cta'
      ? COLORS.CTA
      : p.buttonType === 'secondary'
      ? COLORS.SECONDARY
      : COLORS.PRIMARY};

  padding: ${(p) => (p.small ? SPACING : SPACING * 1.5)}px
    ${(p) => (p.small ? SPACING : SPACING * 2)}px;
  border-radius: ${SPACING}px;
  justify-content: center;
`

const StyledText = styled(Heading6)<{ color?: string; buttonType?: string }>`
  color: ${(p) =>
    p.color ? p.color : p.buttonType === 'secondary' ? COLORS.PRIMARY : COLORS.WHITE};
  text-align: center;
`

const Button = ({
  small,
  color,
  fullWidth,
  maxWidth,
  link,
  buttonType,
  children,
  ...rest
}: Props) => {
  const { windowWidth } = useWindowDimensions()
  const width = useMemo(() => maxWidth ?? windowWidth * IO_COMPONENT_WIDTH_PERCENT, [])
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
      <StyledButton
        small={small}
        buttonType={buttonType}
        fullWidth={fullWidth}
        maxWidth={width}
        {...rest}>
        <StyledText color={color} buttonType={buttonType}>
          {children}
        </StyledText>
      </StyledButton>
    </MotiLink>
  ) : (
    <StyledButton
      small={small}
      buttonType={buttonType}
      fullWidth={fullWidth}
      maxWidth={width}
      {...rest}>
      <StyledText color={color} buttonType={buttonType}>
        {children}
      </StyledText>
    </StyledButton>
  )
}

export default Button
