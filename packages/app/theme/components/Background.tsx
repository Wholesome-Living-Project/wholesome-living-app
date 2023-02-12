import React, { PropsWithChildren } from 'react'
import styled from 'styled-components/native'
import { __COLORS } from '../theme'

const StyledView = styled.View`
  display: flex;
  flex-direction: column;
  flex: 1;
  justify-content: center;
  align-items: center;
  background: ${__COLORS.GREY};
`

const Background = ({ children }: PropsWithChildren) => {
  return <StyledView>{children}</StyledView>
}

export default Background
