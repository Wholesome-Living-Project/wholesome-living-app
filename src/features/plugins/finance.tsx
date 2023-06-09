import React, { useCallback, useEffect, useRef, useState } from 'react'
import { Platform, ScrollView } from 'react-native'
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
import { useOnboarding } from '../../provider/OnboardingProvider'
import { COLORS, OUTER_BORDER_RADIUS, SPACING } from '../../theme/theme'
import { Body, Heading1, Heading4, Heading6, Regular } from '../../theme/typography'
import PluginScreenLayout from './PluginScreenLayout'

const Container = styled(Flex)`
  position: relative;
  border-radius: ${OUTER_BORDER_RADIUS}px;
  padding: ${SPACING * 3}px;
`

const FormContainer = styled(Flex)<{ width?: number }>`
  width: ${(p) => p.width ?? 100}%;
`

const Finance = () => {
  const { saveSpending, getSpendings, spendings, aggregateSavings } = useFinance()
  const [amount, setAmount] = useState('')
  const [reason, setReason] = useState('')
  const [loading, setLoading] = useState(false)
  const [buttonPosition, setButtonPosition] = useState(0)
  const { keyboardOpen } = useKeyboard()
  const scrollRef = useRef<ScrollView | null>(null)
  const { getLevels } = useLevels()
  const { selectedStrategy, roundUpNumber } = useOnboarding()

  useEffect(() => {
    if (keyboardOpen) {
      setTimeout(() => scrollRef.current?.scrollToEnd({ animated: true }), 100)
    }
  }, [buttonPosition, keyboardOpen])

  useEffect(() => {
    getSpendings()
  }, [getSpendings])

  const onAddSpending = useCallback(async () => {
    setLoading(true)
    if (!Number(amount)) {
      setLoading(false)

      return
    }

    console.log(Math.floor(new Date().getTime() / 1000))
    await saveSpending({
      amount: Number(amount),
      spendingTime: Math.floor(new Date().getTime() / 1000),
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
      <Container>
        <Heading4>Invest in yourself</Heading4>
        <Body color={COLORS.DARK_GREY}>
          We will track all your expenditures and notify you at the end of the month how much you
          spent and how much you should invest according to your chosen strategy.
        </Body>
        <Spacer x={2} />
        <Flex row align={'flex-end'}>
          <Regular>Your current strategy: </Regular>
          <Heading6>
            {selectedStrategy === 'Plus'
              ? 'Fixed'
              : selectedStrategy === 'Round'
              ? 'Round up by'
              : 'Percentage'}{' '}
            {roundUpNumber}
          </Heading6>
        </Flex>
        <Spacer x={4} />
        <Heading4>Your Savings </Heading4>
        <Body color={COLORS.DARK_GREY}>
          This number reflects the amount you should save this month in order to make a difference
          in your financial future.
        </Body>
        <Heading1>{aggregateSavings} CHF</Heading1>
        <Spacer x={4} />
        <Heading4>Track your expenses</Heading4>
        <Spacer x={1} />
        <FormContainer column flex={1} width={60}>
          <Body color={COLORS.DARK_GREY}>How much did you spend?</Body>
          <Spacer x={1} />
          <Flex row align={'center'}>
            <Input
              value={amount}
              onChangeText={setAmount}
              keyboardType={'numeric'}
              placeholder={'Amount'}
              maxLength={4}
              minHeight={50}
            />
            <Spacer x={2} />
            <Heading4 color={COLORS.BLACK}>CHF</Heading4>
          </Flex>
        </FormContainer>
        <Spacer x={2} />
        <FormContainer column flex={1}>
          <Flex>
            <Input
              placeholder={'Category'}
              onChangeText={setReason}
              value={reason}
              maxLength={20}
              minHeight={50}
            />
          </Flex>
        </FormContainer>
        <Spacer x={2} />
        <Body color={COLORS.DARK_GREY}>
          Try to label similar categories the same for consistent feedback
        </Body>
        <Spacer x={1} />
        <Button
          small
          fullWidth
          disabled={loading || !amount || !reason}
          onPress={onAddSpending}
          buttonType={'black'}
          onLayout={(e) => setButtonPosition(e.nativeEvent.layout.y)}>
          Track Expense
        </Button>
        <Spacer x={2} />
        {spendings.length > 0 && (
          <>
            <Spacer x={2} />
            <FinanceHistory preview={3} />
          </>
        )}

        {keyboardOpen && (
          <Spacer
            x={
              spendings.length === 0
                ? Platform.OS === 'android'
                  ? 20
                  : 42
                : spendings.length === 1
                ? Platform.OS === 'android'
                  ? 12
                  : 25
                : spendings.length === 2
                ? Platform.OS === 'android'
                  ? 12
                  : 20
                : 15
            }
          />
        )}
      </Container>
    </PluginScreenLayout>
  )
}

export default Finance
