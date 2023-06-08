import React from 'react'
import styled from 'styled-components'
import { SettingsPluginName } from '../../../api/openapi'
import { Flex } from '../../components/ui/Flex'
import Spacer from '../../components/ui/Spacer'
import { COLORS, OUTER_BORDER_RADIUS, SPACING } from '../../theme/theme'
import { Body, Heading4, Heading6, Regular } from '../../theme/typography'
import PluginScreenLayout from './PluginScreenLayout'

const Container = styled(Flex)`
  position: relative;
  border-radius: ${OUTER_BORDER_RADIUS}px;
  padding: ${SPACING * 4}px;
`

const Elevator = () => {
  return (
    <PluginScreenLayout plugin={SettingsPluginName.PluginNameElevator}>
      <Container align={'center'}>
        <Heading4>Take the stairs</Heading4>
        <Spacer x={1} />
        <Body color={COLORS.DARK_GREY}>
          Make the tree grow by taking the stairs! We will track your movement patterns and how much
          you take the stairs. According to this data you will gain experience points and level up.
        </Body>
        <Spacer x={2} />
        <Flex row align={'flex-end'}>
          <Regular>Your stairs count: </Regular>
          <Heading6>1</Heading6>
        </Flex>
      </Container>
    </PluginScreenLayout>
  )
}

export default Elevator
