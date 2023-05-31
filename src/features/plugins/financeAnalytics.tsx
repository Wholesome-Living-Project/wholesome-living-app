import React, { useEffect } from 'react'
import { Dimensions, Image, ScrollView, View } from 'react-native'
import { BarChart, PieChart } from 'react-native-chart-kit'
import styled from 'styled-components'
import FinanceHistory from '../../components/dashboard/plugins/FinanceHistory'
import { Flex } from '../../components/ui/Flex'
import Spacer from '../../components/ui/Spacer'
import { PLUGINS } from '../../helpers/pluginList'
import { useFinance } from '../../provider/FinanceContentProvider'
import { COLORS, OUTER_BORDER_RADIUS, SPACING } from '../../theme/theme'
import { Heading1, Heading4, Heading6 } from '../../theme/typography'

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
  background-color: ${COLORS.GREY};
  border-radius: ${OUTER_BORDER_RADIUS}px;
  padding: ${SPACING * 4}px;
`

const FinanceAnalytics = () => {
  const { getSpendings, aggregatedSpendings } = useFinance()

  useEffect(() => {
    getSpendings()
  }, [getSpendings])

  return (
    <>
      <ImageContainer>
        <StyledImage source={require('../../../assets/images/woman_saving_money_analytics.png')} />
        <Flex column>
          <Spacer x={15} />
          <Heading1 color={COLORS.WHITE}>{PLUGINS['FINANCE'].title}</Heading1>
        </Flex>
      </ImageContainer>
      <ScrollView>
        <Spacer x={30} />
        <Container align={'center'}>
          <Heading4>Your Analytics</Heading4>
          <Spacer x={4} />
          <Heading6>Daily Spendings</Heading6>
          <Spacer x={2} />
          <BarChart
            data={{
              labels: ['Tue', 'Wed', 'Thu', 'Today', 'Sat', 'Sun'],
              datasets: [
                {
                  data: [140, 250, 100, aggregatedSpendings, 0, 0],
                },
              ],
            }}
            width={Dimensions.get('window').width - 16}
            height={250}
            yAxisLabel={'CHF  '}
            yAxisSuffix={''}
            chartConfig={{
              backgroundColor: `${COLORS.GREY}`,
              backgroundGradientFrom: `${COLORS.GREY}`,
              backgroundGradientTo: `${COLORS.GREY}`,
              decimalPlaces: 0,
              color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
              strokeWidth: 2,
              style: {
                borderRadius: 16,
              },
            }}
          />
          <Spacer x={4} />
          <Heading6>Spendings By Category</Heading6>
          <Spacer x={2} />
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
            width={Dimensions.get('window').width - 16}
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
            accessor="population"
            backgroundColor="transparent"
            paddingLeft="15"
            absolute //for the absolute number remove if you want percentage
          />
          <Spacer x={4} />
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
