import { COLORS, SPACING } from 'app/theme/theme'
import { Regular } from 'app/theme/typography'
import React from 'react'
import { View } from 'react-native'
import styled from 'styled-components'

const PluginBanner = styled(View)<{ color?: string }>`
  background-color: ${(p) => p.color ?? COLORS.PRIMARY};
  height: 60px;
  width: 60px;
  border-radius: ${SPACING}px;
`

const Container = styled(View)`
  display: flex;
  flex-direction: column;
`

export type PluginType = { title: string; color?: string }

const Plugin = ({ title, color }: PluginType) => {
  return (
    <Container>
      <PluginBanner color={color} />
      <Regular center>{title}</Regular>
    </Container>
  )
}

export default Plugin
