import { FontAwesome, Ionicons, MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons'
import { PluginType } from 'app/helpers/pluginList'
import { alpha } from 'app/theme/alpha'
import { COLORS, INNER_BORDER_RADIUS } from 'app/theme/theme'
import { Flex } from 'axelra-styled-bootstrap-grid'
import React from 'react'
import styled from 'styled-components'

const PluginContainer = styled.div<{ color?: string }>`
  box-shadow: 0 6px 8px ${alpha(0.5, COLORS.PRIMARY)};
  border-radius: ${INNER_BORDER_RADIUS}px;
  overflow: hidden;
`

const Gradient = styled(Flex)<{ size?: number; color?: string }>`
  height: ${(p) => p.size ?? 60}px;
  width: ${(p) => p.size ?? 60}px;
  background: linear-gradient(
    90deg,
    ${(p) => p.color ?? COLORS.PRIMARY} 0%,
    ${(p) => (p.color ? alpha(0.6, p.color) : COLORS.PRIMARY)} 100%
  );
`

const PluginBannerWeb = ({
  color,
  icon,
  faIcon,
  materialIcon,
  ionIcon,
  size,
}: PluginType & { size?: number }) => {
  return (
    <PluginContainer>
      <Gradient size={60} color={color} justify={'center'} align={'center'} row>
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

export default PluginBannerWeb
