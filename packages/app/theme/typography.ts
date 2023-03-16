import { SPACING, __COLORS } from 'app/theme/theme'
import { css } from 'styled-components'
import styled from 'styled-components/native'

export enum FontWeights {
  Thin = 100,
  ExtraLight = 200,
  Light = 300,
  Normal = 400,
  Medium = 500,
  SemiBold = 600,
  Bold = 700,
  ExtraBold = 800,
  Black = 900,
}

export type TextProps = {
  size?: number
  weight?: keyof typeof FontWeights | number
  center?: boolean
  color?: string
  block?: boolean
}

export const HeadingRoot = css`
  font-weight: 500;
  margin: ${SPACING}px 0;
`

export type AttrProps = {
  weight?: string
  block?: boolean
  center?: boolean
  color?: string
}

export const TEXT_SIZE = 12

const Text = styled.Text<TextProps>`
  font-size: ${(p) => p.size ?? TEXT_SIZE}px;
  text-align: ${(p) => (p.center ? 'center' : 'left')};
  color: ${(p) => p.color ?? __COLORS.BLACK};
  display: ${(p) => (p.block ? 'block' : 'inline')};
  font-weight: ${(p) => p.weight};
`

export const Heading1 = styled.Text<AttrProps>`
  ${HeadingRoot};
  font-size: 40px;
  font-weight: ${(p) => p.weight ?? FontWeights.SemiBold};
  text-align: ${(p) => (p.block ? 'justify' : 'left')};
  color: ${(p) => p.color ?? __COLORS.BLACK};
`

export const Heading2 = styled.Text<AttrProps>`
  ${HeadingRoot};
  font-size: 32px;
  font-weight: ${(p) => p.weight ?? FontWeights.SemiBold};
  text-align: ${(p) => (p.center ? 'center' : p.block ? 'justify' : 'left')};
  color: ${(p) => p.color ?? __COLORS.BLACK};
`

export const Heading3 = styled.Text<AttrProps>`
  ${HeadingRoot};
  font-size: 28px;
  font-weight: ${(p) => p.weight ?? FontWeights.SemiBold};
  text-align: ${(p) => (p.center ? 'center' : p.block ? 'justify' : 'left')};
  color: ${(p) => p.color ?? __COLORS.BLACK};
`

export const Heading4 = styled.Text<AttrProps>`
  ${HeadingRoot};
  font-size: 24px;
  font-weight: ${(p) => p.weight ?? FontWeights.SemiBold};
  text-align: ${(p) => (p.center ? 'center' : p.block ? 'justify' : 'left')};
  color: ${(p) => p.color ?? __COLORS.BLACK};
`

export const Heading5 = styled.Text<AttrProps>`
  ${HeadingRoot};
  font-size: 20px;
  font-weight: ${(p) => p.weight ?? FontWeights.SemiBold};
  text-align: ${(p) => (p.center ? 'center' : p.block ? 'justify' : 'left')};
  color: ${(p) => p.color ?? __COLORS.BLACK};
`

export const Heading6 = styled.Text<AttrProps>`
  ${HeadingRoot};
  font-size: 16px;
  font-weight: ${(p) => p.weight ?? FontWeights.SemiBold};
  text-align: ${(p) => (p.center ? 'center' : p.block ? 'justify' : 'left')};
  color: ${(p) => p.color ?? __COLORS.BLACK};
`

export const Regular = styled.Text<AttrProps>`
  ${HeadingRoot};
  font-size: 16px;
  font-weight: ${(p) => p.weight ?? FontWeights.Medium};
  text-align: ${(p) => (p.center ? 'center' : p.block ? 'justify' : 'left')};
  color: ${(p) => p.color ?? __COLORS.BLACK};
`

export const Light = styled.Text<AttrProps>`
  ${HeadingRoot};
  font-size: 14px;
  font-weight: ${(p) => p.weight ?? FontWeights.Light};
  text-align: ${(p) => (p.center ? 'center' : p.block ? 'justify' : 'left')};
  color: ${(p) => p.color ?? __COLORS.BLACK};
`

export const Caption = styled.Text<AttrProps>`
  ${HeadingRoot};
  font-size: 10px;
  font-weight: ${(p) => p.weight ?? FontWeights.Light};
  text-align: ${(p) => (p.center ? 'center' : p.block ? 'justify' : 'left')};
  color: ${(p) => p.color ?? __COLORS.BLACK};
`

/*export const Heading7 = styled(Text)<AttrProps>`
  font-weight: ${(p) => p.weight ?? FontWeights.Medium};
  text-align: ${(p) => (p.center ? 'center' : p.block ? 'justify' : 'left')};
  color: ${(p) => p.color ?? __COLORS.BLACK};
`*/
