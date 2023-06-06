import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import React from 'react'
import { ScrollView, Text, View } from 'react-native'
import Ionicons from 'react-native-vector-icons/Ionicons'
import styled from 'styled-components'
import { SectionTitleContainer } from '../../components/dashboard/SharedStyles'
import Background from '../../components/ui/Background'
import { Flex } from '../../components/ui/Flex'
import { COLORS, OUTER_BORDER_RADIUS } from '../../theme/theme'
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

const JustifiedText = styled(Text)`
  text-align: justify;
`

const PensionScreen = () => (
  <Background>
    <ScrollView>
      <Container>
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
      </Container>
    </ScrollView>
  </Background>
)

const FinanceScreen = () => (
  <Background>
    <ScrollView>
      <Container>
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
      </Container>
    </ScrollView>
  </Background>
)

const AntiAgingScreen = () => (
  <Background>
    <ScrollView>
      <Container>
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
      </Container>
    </ScrollView>
  </Background>
)

const Tab = createBottomTabNavigator()

const AcademyScreen = () => (
  <Tab.Navigator>
    <Tab.Screen
      name="Pension"
      component={PensionScreen}
      options={{
        tabBarIcon: ({ color, size }) => (
          <Ionicons name="wallet-outline" color={color} size={size} />
        ),
      }}
    />
    <Tab.Screen
      name="Finance"
      component={FinanceScreen}
      options={{
        tabBarIcon: ({ color, size }) => (
          <Ionicons name="analytics-outline" color={color} size={size} />
        ),
      }}
    />
    <Tab.Screen
      name="Anti-Aging"
      component={AntiAgingScreen}
      options={{
        tabBarIcon: ({ color, size }) => (
          <Ionicons name="heart-outline" color={color} size={size} />
        ),
      }}
    />
  </Tab.Navigator>
)

export default AcademyScreen
