import { MaterialCommunityIcons } from '@expo/vector-icons'
import { useRootNavigation } from 'expo-router'
import React, { useCallback, useEffect, useRef, useState } from 'react'
import { ScrollView, TouchableOpacity } from 'react-native'
import styled from 'styled-components'
import { SettingsPluginName } from '../../../api/openapi'
import FinanceHistory from '../../components/dashboard/plugins/FinanceHistory'
import Button from '../../components/ui/Button'
import { Flex } from '../../components/ui/Flex'
import Input from '../../components/ui/Input'
import Spacer from '../../components/ui/Spacer'
import useKeyboard from '../../hooks/useKeyboard'
import { useFinance } from '../../provider/FinanceContentProvider'
import { useLevels } from '../../provider/LevelProvider'
import { COLORS, OUTER_BORDER_RADIUS, SPACING } from '../../theme/theme'
import { Heading4, Heading6 } from '../../theme/typography'
import PluginScreenLayout from './PluginScreenLayout'

const Container = styled(Flex)`
  position: relative;
  border-radius: ${OUTER_BORDER_RADIUS}px;
  padding: ${SPACING * 4}px;
`
const DetailsContainer = styled(Flex)`
  width: 100%;
`

const FormContainer = styled(Flex)`
  width: 100%;
`

const Finance = () => {
  const { saveSpending, getSpendings, aggregateSavings } = useFinance()
  const [amount, setAmount] = useState('')
  const [reason, setReason] = useState('')
  const [loading, setLoading] = useState(false)
  const [buttonPosition, setButtonPosition] = useState(0)
  const { keyboardOpen } = useKeyboard()
  const scrollRef = useRef<ScrollView | null>(null)
  const { getLevels } = useLevels()

  useEffect(() => {
    if (keyboardOpen) {
      scrollRef.current?.scrollToEnd({ animated: true })
    }
  }, [buttonPosition, keyboardOpen])

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
    <PluginScreenLayout plugin={SettingsPluginName.PluginNameFinance} ref={scrollRef}>
      <Container align={'center'}>
        <Heading4>Track your spendings</Heading4>
        <Spacer x={2} />
        <FormContainer column flex={1}>
          <Heading6>Amount</Heading6>
          <Flex row>
            <Input
              value={amount}
              onChangeText={setAmount}
              keyboardType={'numeric'}
              placeholder={'Spendings'}
              maxLength={6}
              minHeight={50}
            />
            <Spacer x={2} />
            <Heading4 color={COLORS.BLACK}>CHF</Heading4>
          </Flex>
        </FormContainer>
        <FormContainer column flex={1}>
          <Flex>
            <Heading6>Comment</Heading6>
            <Flex>
              <Input
                placeholder={'Reason'}
                onChangeText={setReason}
                value={reason}
                maxLength={20}
                minHeight={50}
              />
            </Flex>
          </Flex>
        </FormContainer>
        <Spacer x={3} />
        <Button
          small
          fullWidth
          disabled={loading}
          onPress={onAddSpending}
          buttonType={'black'}
          onLayout={(e) => setButtonPosition(e.nativeEvent.layout.y)}>
          Track Spending
        </Button>
        <Spacer x={2} />
        <DetailsContainer row justify={'flex-end'}>
          <TouchableOpacity onPress={() => navigation?.navigate('finance-analytics' as never)}>
            <Flex row align={'center'}>
              <Heading6>See details</Heading6>
              <Spacer x={0.5} />
              <MaterialCommunityIcons name={'arrow-right'} size={18} color={COLORS.BLACK} />
            </Flex>
          </TouchableOpacity>
        </DetailsContainer>
        <FinanceHistory preview={3} />
        <Spacer x={20} />
      </Container>
    </PluginScreenLayout>
  )
}

export default Finance
