import { FontAwesome, Ionicons, MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons'
import { PluginType } from 'app/helpers/pluginList'
import { alpha } from 'app/theme/alpha'
import { COLORS, SPACING } from 'app/theme/theme'
import { LinearGradient } from 'expo-linear-gradient'
import React from 'react'
import { View } from 'react-native'
import styled from 'styled-components'

const PluginContainer = styled(View)<{ color?: string }>`
  box-shadow: 0 6px 8px ${alpha(0.5, COLORS.PRIMARY)};
`

const Gradient = styled(LinearGradient)<{ size?: number }>`
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
    <PluginContainer>
      <Gradient
        colors={[color ?? COLORS.PRIMARY, color ? alpha(0.6, color) : COLORS.PRIMARY]}
        start={{ x: 0.1, y: 0.4 }}
        size={size}>
        {icon && (
          <MaterialCommunityIcons size={size ? size * 0.5 : 30} color={COLORS.WHITE} name={icon} />
        )}
        {faIcon && <FontAwesome size={size ? size * 0.5 : 30} color={COLORS.WHITE} name={faIcon} />}
        {materialIcon && (
          <MaterialIcons size={size ? size * 0.5 : 30} color={COLORS.WHITE} name={materialIcon} />
        )}
        {ionIcon && <Ionicons size={size ? size * 0.5 : 30} color={COLORS.WHITE} name={ionIcon} />}
      </Gradient>
    </PluginContainer>
  )
}

export default PluginBanner
