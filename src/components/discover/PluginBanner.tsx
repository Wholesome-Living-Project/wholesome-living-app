import { FontAwesome, Ionicons, MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons'
import { alpha } from 'axelra-react-native-utilities'

import { LinearGradient } from 'expo-linear-gradient'
import React, { useMemo } from 'react'
import { View } from 'react-native'
import styled from 'styled-components'
import { SettingsPluginName } from '../../../api/openapi'
import { PLUGINS } from '../../helpers/pluginList'
import { COLORS, SPACING } from '../../theme/theme'

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

type Props = {
  plugin: SettingsPluginName
  size?: number
}

const PluginBanner = ({ plugin, size }: Props) => {
  const color = useMemo(() => PLUGINS[plugin].color, [plugin])
  const icon = useMemo(() => PLUGINS[plugin].icon, [plugin])
  const faIcon = useMemo(() => PLUGINS[plugin].faIcon, [plugin])
  const materialIcon = useMemo(() => PLUGINS[plugin].materialIcon, [plugin])
  const ionIcon = useMemo(() => PLUGINS[plugin].ionIcon, [plugin])

  return (
    <PluginContainer>
      <Gradient
        colors={[color ?? COLORS.PRIMARY, color ? alpha(0.6, color) : alpha(0.6, COLORS.PRIMARY)]}
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
