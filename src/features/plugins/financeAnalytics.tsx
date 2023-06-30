import { AntDesign, Ionicons } from '@expo/vector-icons'
import { alpha } from 'axelra-react-native-utilities'
import React, { useEffect, useMemo } from 'react'
import { ScrollView } from 'react-native'
import { BarChart, LineChart, PieChart } from 'react-native-chart-kit'
import styled from 'styled-components'
import FinanceHistory from '../../components/dashboard/plugins/FinanceHistory'
import { Flex } from '../../components/ui/Flex'
import Spacer from '../../components/ui/Spacer'
import { getLast7Days } from '../../helpers/datesHelper'
import { PLUGIN_COLORS } from '../../helpers/pluginList'
import { useWindowDimensions } from '../../hooks/useWindowDimensions'
import { useFinance } from '../../provider/FinanceContentProvider'
import { CHART_COLORS, COLORS, OUTER_BORDER_RADIUS, SPACING } from '../../theme/theme'
import { Heading4 } from '../../theme/typography'
import ChartContainer from './ChartContainer'

const Container = styled(Flex)`
  position: relative;
  background-color: ${COLORS.WHITE};
  border-radius: ${OUTER_BORDER_RADIUS}px;
  padding: ${SPACING * 3}px;
`

const FinanceAnalytics = () => {
  const { getSpendings, aggregateSavings, spendings } = useFinance()

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

    let dayNames = {}

    for (let date in aggregates) {
      let day = new Date(date)
      let dayName = day.toLocaleDateString('en-US', { weekday: 'short' }) // Change 'en-US' to your preferred locale if needed
      dayNames[dayName] = aggregates[date]
    }

    return dayNames
  }, [spendings])

  const spendingsByCategory = useMemo(() => {
    let categoryCounts: { [description: string]: number } = {}

    // Aggregate descriptions
    spendings.forEach((investment) => {
      if (investment.description) {
        if (categoryCounts.hasOwnProperty(investment.description)) {
          categoryCounts[investment.description.toLowerCase()] += investment.amount ?? 0
        } else {
          categoryCounts[investment.description.toLowerCase()] = investment.amount ?? 0
        }
      }
    })

    // Convert object to array and sort it in descending order by count
    let sortedCategories = Object.keys(categoryCounts)
      .map((description) => ({ description, count: categoryCounts[description] }))
      .sort((a, b) => (b.count && a.count ? b.count - a.count : 1))

    // If there are more than topN categories, aggregate the rest into an "Other" category
    if (sortedCategories.length > 4) {
      let otherCount = sortedCategories
        .slice(4)
        .reduce((total, category) => total + (category.count ?? 0), 0)
      sortedCategories = sortedCategories.slice(0, 4)
      sortedCategories.push({ description: 'other', count: otherCount })
    }

    return sortedCategories
  }, [spendings])

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
              'The bar chart shows how much you spent each day in the last week. The more you spend the more you will have to invest to balance things out.'
            }>
            <BarChart
              data={{
                labels: Object.keys(spendingsByDate).reverse(),
                datasets: [
                  {
                    data: Object.values(spendingsByDate).reverse() as number[],
                    colors: [
                      () => PLUGIN_COLORS.finance ?? COLORS.PRIMARY,
                      () => PLUGIN_COLORS.finance ?? COLORS.PRIMARY,
                      () => PLUGIN_COLORS.finance ?? COLORS.PRIMARY,
                      () => PLUGIN_COLORS.finance ?? COLORS.PRIMARY,
                      () => PLUGIN_COLORS.finance ?? COLORS.PRIMARY,
                      () => PLUGIN_COLORS.finance ?? COLORS.PRIMARY,
                      () => PLUGIN_COLORS.finance ?? COLORS.PRIMARY,
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
                barPercentage: 0.6,
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
              'This pie chart shows how much you spent (in CHF) on what category. Try to use the same names for categories to show them here aggregated.'
            }>
            <PieChart
              data={spendingsByCategory.map((category, index) => ({
                name: category.description,
                population: category.count,
                color: CHART_COLORS[index],
                legendFontColor: '#7F7F7F',
                legendFontSize: 15,
              }))}
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
              absolute //for the absolute number remove if you want percentage
            />
          </ChartContainer>
          <Spacer x={4} />
          <ChartContainer
            chartType={'Line chart'}
            title={'Your Savings'}
            icon={<AntDesign name={'linechart'} size={22} color={PLUGIN_COLORS.finance} />}
            description={'This line chart shows how much you saved (in CHF) per month.'}>
            <LineChart
              withHorizontalLabels={true}
              withVerticalLabels={true}
              data={{
                labels: ['Jan', 'Mar', 'May', 'Jul', 'Sep'],
                datasets: [
                  {
                    data: [7056, 7056, 7056, 7056, 7056, 7056],
                    strokeWidth: 2,
                    color: () => COLORS.PRIMARY, // optional
                  },
                  {
                    data: [0, 0, 0, 0, 0, aggregateSavings],
                    strokeWidth: 2,
                    color: () => PLUGIN_COLORS.finance ?? COLORS.PRIMARY, // optional
                  },
                ],
                legend: ['Max', 'Your 3a'],
              }}
              width={windowWidth - SPACING * 10}
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
          <Spacer x={6} />
          <FinanceHistory />
          <Spacer x={4} />
        </Container>
      </ScrollView>
    </>
  )
}

export default FinanceAnalytics
