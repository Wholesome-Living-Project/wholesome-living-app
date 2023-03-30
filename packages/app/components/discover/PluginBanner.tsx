import { FontAwesome, Ionicons, MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons'
import { PluginType } from 'app/components/discover/Plugin'
import { COLORS, SPACING } from 'app/theme/theme'
import React from 'react'
import { View } from 'react-native'
import styled from 'styled-components'

const PluginContainer = styled(View)<{ color?: string; size?: number }>`
  background-color: ${(p) => p.color ?? COLORS.PRIMARY};
  height: ${(p) => p.size ?? 60}px;
  width: ${(p) => p.size ?? 60}px;
  border-radius: ${SPACING}px;
  justify-content: center;
  align-items: center;
`

const PluginBanner = ({
  color,
  icon,
  faIcon,
  materialIcon,
  ionIcon,
  size,
}: PluginType & { size?: number }) => {
  return (
    <PluginContainer color={color} size={size}>
      {icon && (
        <MaterialCommunityIcons size={size ? size * 0.5 : 30} color={COLORS.WHITE} name={icon} />
      )}
      {faIcon && <FontAwesome size={size ? size * 0.5 : 30} color={COLORS.WHITE} name={faIcon} />}
      {materialIcon && (
        <MaterialIcons size={size ? size * 0.5 : 30} color={COLORS.WHITE} name={materialIcon} />
      )}
      {ionIcon && <Ionicons size={size ? size * 0.5 : 30} color={COLORS.WHITE} name={ionIcon} />}
    </PluginContainer>
  )
}

export default PluginBanner
