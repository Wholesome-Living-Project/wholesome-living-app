import { onlyOnMobile } from 'app/helpers/onlyOnMobile'
import { onlyOnWeb } from 'app/helpers/onlyOnWeb'
import React, { PropsWithChildren } from 'react'
import { View } from 'react-native'
import styled from 'styled-components/native'
import { COLORS, HEADER_HEIGHT, SPACING } from '../../theme/theme'

const StyledView = styled(View)<BackgroundProps>`
  display: flex;
  position: relative;
  flex-direction: column;
  flex: 1;
  background: ${COLORS.GREY};
  padding: ${SPACING * 4}px;
  ${(p) =>
    onlyOnMobile(
      `justify-content: ${
        p.bottom ? 'flex-end' : p.center ? 'center' : 'flex-start'
      }; align-items: center; padding-bottom: ${SPACING * 10}px`
    )}
  ${onlyOnWeb(`top: ${HEADER_HEIGHT}px`)}
`
type BackgroundProps = { center?: boolean; bottom?: boolean; alignCenter?: boolean }
type Props = BackgroundProps & PropsWithChildren

const Background = ({ center, bottom, alignCenter, children }: Props) => {
  return (
    <StyledView center={center} bottom={bottom} alignCenter={alignCenter}>
      {children}
    </StyledView>
  )
}

export default Background
