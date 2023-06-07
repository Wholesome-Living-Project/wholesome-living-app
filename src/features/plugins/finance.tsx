import { FontAwesome } from '@expo/vector-icons'
import { useRootNavigation } from 'expo-router'
import React, { useCallback, useEffect, useState } from 'react'
import { Dimensions, Image, View } from 'react-native'
import { LineChart } from 'react-native-chart-kit'
import styled from 'styled-components'
import { SettingsPluginName } from '../../../api/openapi'
import FinanceHistory from '../../components/dashboard/plugins/FinanceHistory'
import Button from '../../components/ui/Button'
import { Flex } from '../../components/ui/Flex'
import Input from '../../components/ui/Input'
import Spacer from '../../components/ui/Spacer'
import { useFinance } from '../../provider/FinanceContentProvider'
import { useLevels } from '../../provider/LevelProvider'
import { COLORS, OUTER_BORDER_RADIUS, SPACING } from '../../theme/theme'
import { Heading1, Heading4, Heading5, Heading6 } from '../../theme/typography'
import PluginScreenLayout from './PluginScreenLayout'

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
  border-radius: ${OUTER_BORDER_RADIUS}px;
  padding: ${SPACING * 4}px;
`
const TextContainer = styled(Flex)`
  width: 25%;
`

const Finance = () => {
  const { saveSpending, getSpendings, aggregateSavings } = useFinance()
  const [amount, setAmount] = useState('')
  const [reason, setReason] = useState('')
  const [loading, setLoading] = useState(false)
  const { getLevels } = useLevels()

  const navigation = useRootNavigation()

  useEffect(() => {
    getSpendings()
  }, [getSpendings])

  const onAddSpending = useCallback(async () => {
    setLoading(true)
    if (!Number(amount)) {
      setLoading(false)

      return
    }
    await saveSpending({
      amount: Number(amount),
      spendingTime: 1685089324,
      description: reason,
    })
    setAmount('')
    setReason('')
    await getSpendings()
    await getLevels()
    setLoading(false)
  }, [amount, saveSpending, reason, getSpendings, getLevels])

  return (
    <PluginScreenLayout plugin={SettingsPluginName.PluginNameFinance}>
      <Container align={'center'}>
        <Heading4>Track your spendings</Heading4>
        <Spacer x={4} />
        <Flex row align={'center'}>
          <TextContainer>
            <Heading6>Amount:</Heading6>
          </TextContainer>
          <Spacer x={2} />
          <Input
            value={amount}
            onChange={(a) => setAmount(a.nativeEvent.text)}
            keyboardType={'numeric'}
            placeholder={'Spendings'}
            maxLength={6}
            small
          />
          <Spacer x={2} />
          <Heading4 color={COLORS.PRIMARY}>CHF</Heading4>
        </Flex>
        <Spacer x={2} />
        <Flex row align={'center'}>
          <TextContainer>
            <Heading6>Comment:</Heading6>
          </TextContainer>
          <Spacer x={2} />
          <Input
            placeholder={'Reason'}
            value={reason}
            onChange={(e) => setReason(e.nativeEvent.text)}
            maxLength={20}
            small
          />
          <Spacer x={2} />
        </Flex>
        <Spacer x={4} />
        <Flex row>
          <Button small fullWidth disabled={loading} onPress={onAddSpending} buttonType={'black'}>
            Track Spending
          </Button>
        </Flex>
        <Spacer x={3} />
        <FinanceHistory preview={3} />
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
          width={Dimensions.get('window').width - 1}
          height={200}
          chartConfig={{
            backgroundColor: `${COLORS.GREY}`,
            backgroundGradientFrom: `${COLORS.GREY}`,
            backgroundGradientTo: `${COLORS.GREY}`,
            decimalPlaces: 0,
            color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
            style: {
              borderRadius: 16,
            },
          }}
        />
        <Spacer x={2} />
        <Flex row align={'center'}>
          <Heading6 onPress={() => navigation?.navigate('finance-analytics' as never)}>
            Go to Analytics view
          </Heading6>
          <Spacer x={2} />
          <FontAwesome name={'arrow-right'} size={18} color={COLORS.PRIMARY} />
        </Flex>
      </Container>
    </PluginScreenLayout>
  )
}

export default Finance
