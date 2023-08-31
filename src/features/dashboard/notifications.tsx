import React from 'react'
import styled from 'styled-components'
import { Flex } from '../../components/ui/Flex'
import { SPACING } from '../../theme/theme'
import { Body } from '../../theme/typography'

const HORIZONTAL_PADDING = SPACING * 2
const Wrapper = styled(Flex)`
  width: 100%;
  padding: ${SPACING * 4}px ${HORIZONTAL_PADDING}px;
`
export const NotificationsScreen = () => {
  return (
    <Wrapper row justify={'center'}>
      <Body>No notifications yet</Body>
    </Wrapper>
  )
}
