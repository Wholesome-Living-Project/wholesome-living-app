import { useWindowDimensions } from 'app/hooks/useWindowDimensions'
import { Heading5 } from 'app/theme/typography'
import { alpha } from 'axelra-react-native-utilities'
import React, { PropsWithChildren, useMemo } from 'react'
import { Platform, TouchableOpacity, TouchableOpacityProps } from 'react-native'
import { MotiLink } from 'solito/moti'
import styled from 'styled-components/native'
import { COLORS, IO_COMPONENT_WIDTH_PERCENT, OUTER_BORDER_RADIUS, SPACING } from '../../theme/theme'

type ButtonType = 'cta' | 'primary' | 'secondary'

type ButtonProps = {
  small?: boolean
  buttonType?: ButtonType
  fullWidth?: boolean
  maxWidth?: number
  border?: boolean
}

type Props = { color?: string; link?: string } & ButtonProps &
  PropsWithChildren &
  TouchableOpacityProps

const StyledButton = styled(TouchableOpacity)<ButtonProps>`
  display: flex;
  flex-direction: row;
  width: ${(p) => (p.fullWidth ? `${p.maxWidth}px` : 'auto')}
  border-width: ${(p) => (p.buttonType === 'secondary' ? '1.5px' : '0px')}
  border-color: ${(p) =>
    p.border ? (p.disabled ? alpha(0.4, COLORS.PRIMARY) : COLORS.PRIMARY) : '0px'}

  background-color: ${(p) =>
    p.disabled
      ? p.buttonType === 'cta'
        ? alpha(0.4, COLORS.CTA)
        : p.buttonType === 'secondary'
        ? alpha(0.4, COLORS.SECONDARY)
        : alpha(0.4, COLORS.PRIMARY)
      : p.buttonType === 'cta'
      ? COLORS.CTA
      : p.buttonType === 'secondary'
      ? COLORS.SECONDARY
      : COLORS.PRIMARY};
  
  

  padding: ${(p) => (p.small ? SPACING : SPACING * 1.5)}px
    ${(p) => (p.small ? SPACING : SPACING * 2)}px;
  border-radius: ${OUTER_BORDER_RADIUS}px;
  justify-content: center;
  
`

const StyledText = styled(Heading5)<{ color?: string; buttonType?: string }>`
  color: ${(p) =>
    p.color ? p.color : p.buttonType === 'secondary' ? COLORS.PRIMARY : COLORS.WHITE};
  text-align: center;
`

const Button = ({
  small,
  color = COLORS.WHITE,
  fullWidth,
  maxWidth,
  link,
  buttonType,
  children,
  ...rest
}: Props) => {
  const { windowWidth } = useWindowDimensions()
  const width = useMemo(() => maxWidth ?? windowWidth * IO_COMPONENT_WIDTH_PERCENT, [])

  const { disabled } = rest
  const buttonColor = useMemo(() => {
    let baseColor = color
    if (buttonType === 'secondary') {
      baseColor = COLORS.PRIMARY
    }

    return disabled ? alpha(0.2, baseColor) : baseColor
  }, [color, disabled])
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
        <StyledText color={buttonColor} buttonType={buttonType}>
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
      <StyledText color={buttonColor} buttonType={buttonType}>
        {children}
      </StyledText>
    </StyledButton>
  )
}

export default Button
