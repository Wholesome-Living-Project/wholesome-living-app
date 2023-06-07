import { Ionicons } from '@expo/vector-icons'
import React, { useEffect, useMemo } from 'react'
import { Image, ScrollView, View } from 'react-native'
import { BarChart, LineChart, PieChart } from 'react-native-chart-kit'
import styled from 'styled-components'
import FinanceHistory from '../../components/dashboard/plugins/FinanceHistory'
import { Flex } from '../../components/ui/Flex'
import Spacer from '../../components/ui/Spacer'
import { getLast7Days } from '../../helpers/datesHelper'
import { PLUGIN_COLORS } from '../../helpers/pluginList'
import { useWindowDimensions } from '../../hooks/useWindowDimensions'
import { useFinance } from '../../provider/FinanceContentProvider'
import { COLORS, OUTER_BORDER_RADIUS, SPACING } from '../../theme/theme'
import { Heading1, Heading4, Heading5, Heading6 } from '../../theme/typography'
import ChartContainer from './ChartContainer'

const IMAGE_HEIGHT = 320
const ImageContainer = styled(View)`
  position: absolute;
  width: 100%;
  height: ${IMAGE_HEIGHT}px;
  display: flex;
  flex-direction: row;
  justify-content: center;
`

const StyledImage = styled(Image)`
  width: 100%;
  height: ${IMAGE_HEIGHT}px;
  position: absolute;
`

const Container = styled(Flex)`
  position: relative;
  background-color: ${COLORS.WHITE};
  border-radius: ${OUTER_BORDER_RADIUS}px;
  padding: ${SPACING * 3}px;
`

const FinanceAnalytics = () => {
  const { getSpendings, aggregatedSpendings, aggregateSavings, spendings } = useFinance()

  const { windowWidth } = useWindowDimensions()

  const spendingsByDate = useMemo(() => {
    // Initiate an empty object to store the aggregates
    let aggregates: { [date: string]: number } = {}

    const dates = getLast7Days()

    // Initialize all dates with 0
    dates.forEach((date) => {
      aggregates[date.toISOString().slice(0, 10)] = 0
    })

    // Filter investments within the last seven days
    spendings.forEach((investment) => {
      if (!investment.spendingTime) return
      let investmentDate = new Date(investment.spendingTime * 1000) // assuming spendingTime is a Unix timestamp, it is converted to JavaScript timestamp by multiplying by 1000
      let dateStr = investmentDate.toISOString().slice(0, 10) // converting date to string format "YYYY-MM-DD"
      if (aggregates.hasOwnProperty(dateStr)) {
        aggregates[dateStr] += investment.amount || 0 // add the amount to the aggregate of the corresponding date
      }
    })

    return aggregates
  }, [spendings])
  console.log(spendingsByDate)

  useEffect(() => {
    getSpendings()
  }, [getSpendings])

  return (
    <>
      <ScrollView>
        <Container>
          <Heading4>Your Progress</Heading4>
          <Spacer x={2} />
          <ChartContainer
            chartType={'Bar chart'}
            title={'Daily Spending'}
            icon={<Ionicons name={'bar-chart'} size={22} color={PLUGIN_COLORS.finance} />}
            description={
              'This bar chart shows how much you spent each day in the last week. The more you spend the more you will have to invest to balance things out.'
            }>
            <BarChart
              data={{
                labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Today', 'Sat', 'Sun'],
                datasets: [
                  {
                    data: [140, 250, 100, aggregatedSpendings, 0, 0, 0],
                    colors: [
                      () => PLUGIN_COLORS.finance,
                      () => PLUGIN_COLORS.finance,
                      () => PLUGIN_COLORS.finance,
                      () => PLUGIN_COLORS.finance,
                      () => PLUGIN_COLORS.finance,
                      () => PLUGIN_COLORS.finance,
                      () => PLUGIN_COLORS.finance,
                    ],
                  },
                ],
              }}
              withCustomBarColorFromData={true}
              width={windowWidth - SPACING * 10}
              height={240}
              yAxisLabel={'CHF '}
              flatColor={true}
              yAxisSuffix={''}
              showBarTops={false}
              showValuesOnTopOfBars={true}
              withInnerLines={false}
              chartConfig={{
                backgroundColor: 'transparent',
                backgroundGradientFrom: COLORS.WHITE,
                backgroundGradientTo: COLORS.WHITE,
                backgroundGradientFromOpacity: 0,
                backgroundGradientToOpacity: 0,
                barPercentage: 0.8,
                decimalPlaces: 0,
                color: () => COLORS.DARK_GREY,
                strokeWidth: 2,
                barRadius: 5,
                style: {
                  borderRadius: 16,
                },
              }}
            />
          </ChartContainer>
          <Spacer x={4} />
          <ChartContainer
            chartType={'Pie chart'}
            title={'Spending By Category'}
            icon={<Ionicons name={'pie-chart'} size={22} color={PLUGIN_COLORS.finance} />}
            description={
              'This pie chart shows how much you spent on what category. Try to use the same names for categories to show them here aggregated.'
            }>
            <PieChart
              data={[
                {
                  name: 'Food',
                  population: 210,
                  color: `${COLORS.CTA}`,
                  legendFontColor: '#7F7F7F',
                  legendFontSize: 15,
                },
                {
                  name: 'Clothes',
                  population: 150,
                  color: `${COLORS.TAB_BAR_ICONS}`,
                  legendFontColor: '#7F7F7F',
                  legendFontSize: 15,
                },
                {
                  name: 'Transport',
                  population: 100,
                  color: `${COLORS.PRIMARY}`,
                  legendFontColor: '#7F7F7F',
                  legendFontSize: 15,
                },
                {
                  name: 'Utilities',
                  population: 600,
                  color: '#7F7F7F',
                  legendFontColor: '#7F7F7F',
                  legendFontSize: 15,
                },
              ]}
              width={windowWidth - SPACING * 6}
              height={220}
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
              absolute //for the absolute number remove if you want percentage
            />
          </ChartContainer>
          <Spacer x={4} />
          <Heading5>Your Savings</Heading5>
          <Spacer x={2} />
          <Heading1>{aggregateSavings} CHF</Heading1>
          <Spacer x={1} />

          <LineChart
            withHorizontalLabels={true}
            withVerticalLabels={true}
            data={{
              labels: ['Jan', 'Mar', 'May', 'Jul', 'Sep', 'Nov'],
              datasets: [
                {
                  data: [7056, 7056, 7056, 7056, 7056, 7056, 7056],
                  strokeWidth: 2,
                  color: (opacity = 1) => `rgba(255,0,0,${opacity})`, // optional
                },
                {
                  data: [0, 0, 0, 0, 0, 0, aggregateSavings],
                  strokeWidth: 2,
                  color: (opacity = 1) => `rgba(0,0,102, ${opacity})`, // optional
                },
              ],
              legend: ['Max', 'Your 3a'],
            }}
            width={windowWidth - SPACING * 6}
            height={200}
            chartConfig={{
              backgroundColor: `${COLORS.WHITE}`,
              backgroundGradientFrom: `${COLORS.WHITE}`,
              backgroundGradientTo: `${COLORS.WHITE}`,
              decimalPlaces: 0,
              color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
              style: {
                borderRadius: 16,
              },
            }}
          />
          <Heading6>Spendings History</Heading6>
          <Spacer x={2} />
          <FinanceHistory />
          <Spacer x={4} />
        </Container>
      </ScrollView>
    </>
  )
}

export default FinanceAnalytics
