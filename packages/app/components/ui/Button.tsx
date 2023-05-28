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
  buttonColor?: string
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
    p.buttonColor
      ? p.disabled
        ? alpha(0.4, p.buttonColor)
        : p.buttonColor
      : p.disabled
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



  padding: ${(p) => (p.small ? SPACING / 2 : SPACING)}px
  ${(p) => (p.small ? SPACING * 1.5 : SPACING * 2)}px;
  border-radius: ${OUTER_BORDER_RADIUS}px;
  justify-content: center;
  min-height: ${(p) => (p.small ? SPACING * 5 : SPACING * 6)}px;
  
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
  buttonColor,
  buttonType,
  children,
  ...rest
}: Props) => {
  const { windowWidth } = useWindowDimensions()
  const width = useMemo(
    () => maxWidth ?? windowWidth * IO_COMPONENT_WIDTH_PERCENT,
    [maxWidth, windowWidth]
  )

  const { disabled } = rest
  const textColor = useMemo(() => {
    let baseColor = color
    if (buttonType === 'primary') {
      baseColor = COLORS.WHITE
    }

    if (buttonType === 'secondary') {
      baseColor = COLORS.PRIMARY
    }

    if (!baseColor) baseColor = COLORS.PRIMARY

    return disabled ? alpha(0.5, baseColor) : baseColor
  }, [buttonType, color, disabled])

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
        buttonColor={buttonColor}
        maxWidth={width}
        {...rest}>
        <StyledText color={textColor} buttonType={buttonType}>
          {children}
        </StyledText>
      </StyledButton>
    </MotiLink>
  ) : (
    <StyledButton
      small={small}
      buttonType={buttonType}
      fullWidth={fullWidth}
      buttonColor={buttonColor}
      maxWidth={width}
      {...rest}>
      <StyledText color={textColor} buttonType={buttonType}>
        {children}
      </StyledText>
    </StyledButton>
  )
}

export default Button
