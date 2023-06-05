import React, { useState } from 'react'
import { Text } from 'react-native'
import styled from 'styled-components'
import Background from '../../components/ui/Background'
import Button from '../../components/ui/Button'
import { Flex } from '../../components/ui/Flex'
import { COLORS, OUTER_BORDER_RADIUS, SPACING } from '../../theme/theme'

const Container = styled(Flex)`
  position: relative;
  background-color: ${COLORS.GREY};
  border-radius: ${OUTER_BORDER_RADIUS}px;
  padding: ${SPACING * 4}px;
`
const ButtonContainer = styled(Flex)`
  flex-direction: row;
  justify-content: space-around;
  margin-bottom: ${SPACING * 2}px;
`

const AcademyScreen = () => {
  const [activePlugin, setActivePlugin] = useState(null)

  const handlePluginSelect = (plugin) => {
    setActivePlugin(plugin)
  }

  return (
    <Background>
      <ButtonContainer>
        <Button onPress={() => handlePluginSelect('Meditate')}>
          <Text>Meditate</Text>
        </Button>
        <Button onPress={() => handlePluginSelect('Finance')}>
          <Text>Finance</Text>
        </Button>
        <Button onPress={() => handlePluginSelect('Health')}>
          <Text>Health</Text>
        </Button>
      </ButtonContainer>
      <Container>
        {activePlugin === 'Meditate' && <Text>Meditate Content</Text>}
        {activePlugin === 'Finance' && <Text>Finance Content</Text>}
        {activePlugin === 'Health' && <Text>Health Content</Text>}
      </Container>
    </Background>
  )
}

export default AcademyScreen
