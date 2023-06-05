import React, { PropsWithChildren } from 'react'
import { View } from 'react-native'
import styled from 'styled-components/native'
import { BACKGROUND_PADDING } from '../../theme/theme'

const StyledView = styled(View)<BackgroundProps>`
  display: flex;
  position: relative;
  flex-direction: column;
  flex: 1;
  padding: ${BACKGROUND_PADDING}px;
  justify-content: ${(p) => (p.bottom ? 'flex-end' : p.center ? 'center' : 'flex-start')};
  align-items: ${(p) => (p.horizontalCenter ? 'center' : 'unset')};
`
type BackgroundProps = { center?: boolean; bottom?: boolean; horizontalCenter?: boolean }
type Props = BackgroundProps & PropsWithChildren

const Background = ({ center, bottom, horizontalCenter, children }: Props) => {
  return (
    <StyledView center={center} bottom={bottom} horizontalCenter={horizontalCenter}>
      {children}
    </StyledView>
  )
}

export default Background
