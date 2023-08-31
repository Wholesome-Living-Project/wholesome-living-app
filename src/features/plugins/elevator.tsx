import { AntDesign, Ionicons } from '@expo/vector-icons'
import { alpha } from 'axelra-react-native-utilities'
import React, { useCallback, useEffect } from 'react'
import { LineChart, PieChart } from 'react-native-chart-kit'
import styled from 'styled-components'
import { SettingsPluginName } from '../../../api/openapi'
import Button from '../../components/ui/Button'
import { Flex } from '../../components/ui/Flex'
import Spacer from '../../components/ui/Spacer'
import { PLUGIN_COLORS } from '../../helpers/pluginList'
import { useWindowDimensions } from '../../hooks/useWindowDimensions'
import { useElevator } from '../../provider/ElevatorContentProvider'
import { CHART_COLORS, COLORS, OUTER_BORDER_RADIUS, SPACING } from '../../theme/theme'
import { Body, Heading4, Heading6, Regular } from '../../theme/typography'
import ChartContainer from './ChartContainer'
import PluginScreenLayout from './PluginScreenLayout'

const Container = styled(Flex)`
  position: relative;
  border-radius: ${OUTER_BORDER_RADIUS}px;
  padding: ${SPACING * 4}px;
`

const Elevator = () => {
  const {
    elevatorSessions,
    getElevatorSessions,
    saveElevatorSession,
    dailyStairs,
    totalStairs,
    totalElevation,
    walkedElevation,
  } = useElevator()
  const { windowWidth } = useWindowDimensions()

  const addSessions = useCallback(async () => {
    await saveElevatorSession({ stairs: true, amountStairs: 5, heightGain: 40 })
    await getElevatorSessions()
  }, [getElevatorSessions, saveElevatorSession])

  useEffect(() => {
    getElevatorSessions()
  }, [getElevatorSessions])

  // @ts-ignore
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
          <Heading6>{totalStairs}</Heading6>
        </Flex>
        <Spacer x={2} />
        <Button onPress={addSessions}>Add Data</Button>
        <Spacer x={2} />
        {elevatorSessions && Object.keys(dailyStairs).length > 0 && (
          <>
            <ChartContainer
              chartType={'Line chart'}
              title={'Your Walked Stairs'}
              icon={<AntDesign name={'linechart'} size={22} color={PLUGIN_COLORS.finance} />}
              description={'This line chart shows how much you saved (in CHF) per month.'}>
              <LineChart
                withHorizontalLabels={true}
                withVerticalLabels={true}
                data={{
                  labels: Object.keys(dailyStairs),
                  datasets: [
                    {
                      data: Object.keys(dailyStairs).map((key) => dailyStairs[key] ?? 0),
                      strokeWidth: 2,
                      color: () => COLORS.BLACK, // optional
                    },
                  ],
                  legend: ['Stairs'],
                }}
                width={windowWidth - SPACING * 6}
                height={240}
                yAxisSuffix={''}
                withInnerLines={false}
                chartConfig={{
                  backgroundColor: '#e26a00',
                  backgroundGradientFrom: '#fb8c00',
                  fillShadowGradientFrom: COLORS.PRIMARY,
                  fillShadowGradientFromOpacity: 0.3,
                  fillShadowGradientTo: alpha(1, COLORS.WHITE),
                  backgroundGradientTo: '#ffa726',
                  backgroundGradientToOpacity: 0,
                  backgroundGradientFromOpacity: 0,
                  decimalPlaces: 0,
                  color: () => COLORS.BLACK,
                  labelColor: () => COLORS.BLACK,
                  style: {
                    borderRadius: 16,
                  },
                  propsForDots: {
                    r: '5',
                  },
                }}
                bezier
                style={{
                  marginVertical: 8,
                  borderRadius: 16,
                }}
              />
            </ChartContainer>
            <Spacer x={2} />
            <ChartContainer
              chartType={'Pie chart'}
              title={'Elevation Walked vs Elevator'}
              icon={<Ionicons name={'pie-chart'} size={22} color={PLUGIN_COLORS.elevator} />}
              description={
                'This pie chart shows the Percentage of you elevation walked vs taken the elevator.'
              }>
              <PieChart
                data={[
                  {
                    name: 'Elevator',
                    population: totalElevation - walkedElevation,
                    color: CHART_COLORS[1],
                    legendFontColor: '#7F7F7F',
                    legendFontSize: 15,
                  },
                  {
                    name: 'Walked',
                    population: walkedElevation,
                    color: CHART_COLORS[2],
                    legendFontColor: '#7F7F7F',
                    legendFontSize: 15,
                  },
                ]}
                width={windowWidth - SPACING * 6}
                height={190}
                chartConfig={{
                  backgroundColor: '#1cc910',
                  backgroundGradientFrom: '#eff3ff',
                  backgroundGradientTo: '#efefef',
                  decimalPlaces: 2,
                  color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
                  style: {
                    borderRadius: 16,
                  },
                }}
                paddingLeft={'0'}
                accessor="population"
                backgroundColor="transparent"
              />
            </ChartContainer>
            <Spacer x={8} />
          </>
        )}
      </Container>
    </PluginScreenLayout>
  )
}

export default Elevator
