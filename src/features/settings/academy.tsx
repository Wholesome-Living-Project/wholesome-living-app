import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import React from 'react'
import { ScrollView, View } from 'react-native'
import Ionicons from 'react-native-vector-icons/Ionicons'
import styled from 'styled-components'
import { SectionTitleContainer } from '../../components/dashboard/SharedStyles'
import Background from '../../components/ui/Background'
import { Body, Heading4, Heading5 } from '../../theme/typography'

import Spacer from '../../components/ui/Spacer'
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

const JustifiedText = styled(Body)`
  text-align: justify;
`

const PensionScreen = () => (
  <Background>
    <ScrollView>
      <SectionTitleContainer>
        <Heading4>Pension</Heading4>
        <Spacer x={2} />
        <View>
          <Heading5>1st Pillar: AHV</Heading5>
          <Spacer x={1} />
          <JustifiedText>{AHV}</JustifiedText>
          <Spacer x={4} />
          <Heading5>2nd Pillar: BVG</Heading5>
          <Spacer x={1} />
          <JustifiedText>{BVG}</JustifiedText>
          <Spacer x={4} />
          <Heading5>3rd Pillar: Individual</Heading5>
          <Spacer x={1} />
          <JustifiedText>{Individual}</JustifiedText>
          <Spacer x={4} />
        </View>
      </SectionTitleContainer>
    </ScrollView>
  </Background>
)

const FinanceScreen = () => (
  <Background>
    <ScrollView>
      <SectionTitleContainer>
        <Heading4>Finance</Heading4>
        <Spacer x={2} />
        <View>
          <Heading5>Historical Market Analysis</Heading5>
          <Spacer x={1} />
          <JustifiedText>{historicalmarketanalysis}</JustifiedText>
          <Spacer x={4} />
          <Heading5>Compound Interest</Heading5>
          <Spacer x={1} />
          <JustifiedText>{compoundinterest}</JustifiedText>
          <Spacer x={4} />
          <Heading5>How can I invest?</Heading5>
          <Spacer x={1} />
          <JustifiedText>{howtoinvest}</JustifiedText>
          <Spacer x={4} />
          <Heading5>Budgeting</Heading5>
          <Spacer x={1} />
          <JustifiedText>{budgeting}</JustifiedText>
          <Spacer x={4} />
        </View>
      </SectionTitleContainer>
    </ScrollView>
  </Background>
)

const AntiAgingScreen = () => (
  <Background>
    <ScrollView>
      <SectionTitleContainer>
        <Heading4>Anti-Aging</Heading4>
        <Spacer x={2} />
        <View>
          <Heading5>Glucose</Heading5>
          <Spacer x={1} />
          <JustifiedText>{glucose}</JustifiedText>
          <Spacer x={4} />
          <Heading5>Exercise and Movement</Heading5>
          <Spacer x={1} />
          <JustifiedText>{exercise}</JustifiedText>
          <Spacer x={4} />
          <Heading5>Mental Wellbeing</Heading5>
          <Spacer x={1} />
          <JustifiedText>{mental}</JustifiedText>
        </View>
      </SectionTitleContainer>
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
        headerShown: false,
        tabBarIcon: ({ color, size }) => (
          <Ionicons name="wallet-outline" color={color} size={size} />
        ),
      }}
    />
    <Tab.Screen
      name="Finance"
      component={FinanceScreen}
      options={{
        headerShown: false,
        tabBarIcon: ({ color, size }) => (
          <Ionicons name="analytics-outline" color={color} size={size} />
        ),
      }}
    />
    <Tab.Screen
      name="Anti-Aging"
      component={AntiAgingScreen}
      options={{
        headerShown: false,
        tabBarIcon: ({ color, size }) => (
          <Ionicons name="heart-outline" color={color} size={size} />
        ),
      }}
    />
  </Tab.Navigator>
)

export default AcademyScreen
