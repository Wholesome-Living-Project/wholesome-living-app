import styled, { css } from 'styled-components'
import { SPACING, __COLORS } from './theme'

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

const HeadingRoot = css`
  font-weight: 500;
  line-height: 1.2;
  margin: ${SPACING}px 0;
`

export const H1 = styled.span`
  ${HeadingRoot};
  font-size: 40px;
`

export const H2 = styled.span`
  ${HeadingRoot};
  font-size: 32px;
`

export const H3 = styled.span`
  ${HeadingRoot};
  font-size: 28px;
`

export const H4 = styled.span`
  ${HeadingRoot};
  font-size: 24px;
`

export const H5 = styled.span`
  ${HeadingRoot};
  font-size: 20px;
`

export const H6 = styled.span`
  ${HeadingRoot};
  font-size: 16px;
`

const TEXT_SIZE = 12

const Text = styled.span<TextProps>`
  font-size: ${(p) => p.size ?? TEXT_SIZE}px;
  text-align: ${(p) => (p.center ? 'center' : 'left')};
  color: ${(p) => p.color ?? __COLORS.BLACK};
  display: ${(p) => (p.block ? 'block' : 'inline')};
  font-weight: ${(p) =>
    typeof p.weight === 'number' ? p.weight : FontWeights[p.weight ?? 'Normal']};
`

type AttrProps = {
  weight?: string
  block?: boolean
  center?: boolean
  color?: string
}

export const Heading1 = styled(H1)<AttrProps>`
  font-weight: ${(p) => p.weight ?? FontWeights.SemiBold};
  text-align: ${(p) => (p.block ? 'justify' : 'left')};
  color: ${(p) => p.color ?? __COLORS.BLACK};
`

export const Heading2 = styled(H2)<AttrProps>`
  font-weight: ${(p) => p.weight ?? FontWeights.SemiBold};
  text-align: ${(p) => (p.center ? 'center' : p.block ? 'justify' : 'left')};
  color: ${(p) => p.color ?? __COLORS.BLACK};
`

export const Heading3 = styled(H3)<AttrProps>`
  font-weight: ${(p) => p.weight ?? FontWeights.SemiBold};
  text-align: ${(p) => (p.center ? 'center' : p.block ? 'justify' : 'left')};
  color: ${(p) => p.color ?? __COLORS.BLACK};
`

export const Heading4 = styled(H4)<AttrProps>`
  font-weight: ${(p) => p.weight ?? FontWeights.SemiBold};
  text-align: ${(p) => (p.center ? 'center' : p.block ? 'justify' : 'left')};
  color: ${(p) => p.color ?? __COLORS.BLACK};
`

export const Heading5 = styled(H5)<AttrProps>`
  font-weight: ${(p) => p.weight ?? FontWeights.SemiBold};
  text-align: ${(p) => (p.center ? 'center' : p.block ? 'justify' : 'left')};
  color: ${(p) => p.color ?? __COLORS.BLACK};
`

export const Heading6 = styled(H6)<AttrProps>`
  font-weight: ${(p) => p.weight ?? FontWeights.SemiBold};
  text-align: ${(p) => (p.center ? 'center' : p.block ? 'justify' : 'left')};
  color: ${(p) => p.color ?? __COLORS.BLACK};
`

export const Heading7 = styled(Text)<AttrProps>`
  font-weight: ${(p) => p.weight ?? FontWeights.Medium};
  text-align: ${(p) => (p.center ? 'center' : p.block ? 'justify' : 'left')};
  color: ${(p) => p.color ?? __COLORS.BLACK};
`
