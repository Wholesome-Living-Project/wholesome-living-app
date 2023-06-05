import React, { useState } from 'react'
import { ScrollView, Text, View } from 'react-native'
import styled from 'styled-components'
import { SectionTitleContainer } from '../../components/dashboard/SharedStyles'
import Background from '../../components/ui/Background'
import Button from '../../components/ui/Button'
import { Flex } from '../../components/ui/Flex'
import {
  COLORS,
  OUTER_BORDER_RADIUS,
  PRIMARY_TINTS,
  SCREEN_PADDING,
  SPACING,
} from '../../theme/theme'
import { Heading4, Heading5 } from '../../theme/typography'
import {
  AHV,
  budgeting,
  BVG,
  compoundinterest,
  exercise,
  glucose,
  historicalmarketanalysis,
  howtoinvest,
  Individual,
  mental,
} from './academyText'

const Container = styled(Flex)`
  position: relative;
  background-color: ${COLORS.GREY};
  border-radius: ${OUTER_BORDER_RADIUS}px;
`
const ButtonContainer = styled(Flex)`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin-bottom: ${SPACING * 2}px;
  background-color: ${PRIMARY_TINTS['500']};
  border-radius: ${SCREEN_PADDING}px;
  width: 100%;
`

const JustifiedText = styled(Text)`
  text-align: justify;
`
const AcademyScreen = () => {
  const [activePlugin, setActivePlugin] = useState(null)

  const handlePluginSelect = (plugin) => {
    setActivePlugin(plugin)
  }

  return (
    <ScrollView>
      <Background>
        <ButtonContainer>
          <Button onPress={() => handlePluginSelect('Pension')}>
            <Text>Pension</Text>
          </Button>
          <Button onPress={() => handlePluginSelect('Finance')}>
            <Text>Finance</Text>
          </Button>
          <Button onPress={() => handlePluginSelect('Anti-Aging')}>
            <Text>Anti-Aging</Text>
          </Button>
        </ButtonContainer>
        <Container>
          {activePlugin === 'Pension' && (
            <SectionTitleContainer>
              <Heading4>Pension</Heading4>
              <View>
                <Heading5>1st Pillar: AHV</Heading5>
                <JustifiedText>{AHV}</JustifiedText>
                <Heading5>2nd Pillar: BVG</Heading5>
                <JustifiedText>{BVG}</JustifiedText>
                <Heading5>3rd Pillar: Individual</Heading5>
                <JustifiedText>{Individual}</JustifiedText>
              </View>
            </SectionTitleContainer>
          )}
          {activePlugin === 'Finance' && (
            <SectionTitleContainer>
              <Heading4>Finance</Heading4>
              <View>
                <Heading5>Historical Market Analysis</Heading5>
                <JustifiedText>{historicalmarketanalysis}</JustifiedText>
                <Heading5>Compound Interest</Heading5>
                <JustifiedText>{compoundinterest}</JustifiedText>
                <Heading5>How can I invest?</Heading5>
                <JustifiedText>{howtoinvest}</JustifiedText>
                <Heading5>Budgeting</Heading5>
                <JustifiedText>{budgeting}</JustifiedText>
              </View>
            </SectionTitleContainer>
          )}
          {activePlugin === 'Anti-Aging' && (
            <SectionTitleContainer>
              <Heading4>Anti-Aging</Heading4>
              <View>
                <Heading5>Glucose</Heading5>
                <JustifiedText>{glucose}</JustifiedText>
                <Heading5>Exercise and Movement</Heading5>
                <JustifiedText>{exercise}</JustifiedText>
                <Heading5>Mental Wellbeing</Heading5>
                <JustifiedText>{mental}</JustifiedText>
              </View>
            </SectionTitleContainer>
          )}
        </Container>
      </Background>
    </ScrollView>
  )
}

export default AcademyScreen
