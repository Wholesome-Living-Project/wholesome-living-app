import { onlyOnMobile } from 'app/helpers/onlyOnMobile'
import { onlyOnWeb } from 'app/helpers/onlyOnWeb'
import React, { PropsWithChildren } from 'react'
import styled from 'styled-components/native'
import { COLORS, HEADER_HEIGHT, SPACING } from '../theme/theme'

const StyledView = styled.View`
  display: flex;
  position: relative;
  flex-direction: column;
  flex: 1;
  background: ${COLORS.GREY};
  padding: ${SPACING * 4}px;
  ${onlyOnMobile(`justify-content: center; align-items: center;`)}
  ${onlyOnWeb(`top: ${HEADER_HEIGHT}px`)}
`

const Background = ({ children }: PropsWithChildren) => {
  return <StyledView>{children}</StyledView>
}

export default Background
