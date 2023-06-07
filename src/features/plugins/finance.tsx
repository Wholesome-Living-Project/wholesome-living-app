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
import { Body, Heading4, Heading6, Regular } from '../../theme/typography'
import PluginScreenLayout from './PluginScreenLayout'

const Container = styled(Flex)`
  position: relative;
  border-radius: ${OUTER_BORDER_RADIUS}px;
  padding: ${SPACING * 3}px;
`
const DetailsContainer = styled(Flex)`
  width: 100%;
`

const FormContainer = styled(Flex)<{ width?: number }>`
  width: ${(p) => p.width ?? 100}%;
`

const Finance = () => {
  const { saveSpending, getSpendings, spendings } = useFinance()
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
      spendingTime: new Date().getTime() / 1000,
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
          Make the tree grow by tracking your expenditures! We will track all your expenditures and
          notify you at the end of the month how much you spent and how much you should invest
          according to your chosen strategy.
        </Body>
        <Spacer x={2} />
        <Flex row align={'flex-end'}>
          <Body>Your current strategy: </Body>
          <Heading6>Round up</Heading6>
        </Flex>
        <Spacer x={4} />
        <Heading4>Track your expenditures</Heading4>
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
              maxLength={6}
              minHeight={50}
            />
            <Spacer x={2} />
            <Heading4 color={COLORS.BLACK}>CHF</Heading4>
          </Flex>
        </FormContainer>
        <Spacer x={3} />
        <FormContainer column flex={1} width={85}>
          <Body color={COLORS.DARK_GREY}>
            Try to label similar categories the same for consistent feedback .
          </Body>
          <Spacer x={1} />
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
        {spendings.length > 0 && (
          <>
            <Spacer x={2} />
            <FinanceHistory preview={3} />
            <Spacer x={3} />
            <DetailsContainer row justify={'flex-end'}>
              <TouchableOpacity onPress={() => navigation?.navigate('finance-analytics' as never)}>
                <Flex row align={'center'}>
                  <Regular color={COLORS.DARK_GREY}>See more</Regular>
                  <Spacer x={0.5} />
                  <MaterialCommunityIcons color={COLORS.DARK_GREY} name={'arrow-right'} size={18} />
                </Flex>
              </TouchableOpacity>
            </DetailsContainer>
          </>
        )}

        <Spacer
          x={
            spendings.length === 0
              ? 40
              : spendings.length === 1
              ? 25
              : spendings.length === 2
              ? 20
              : 15
          }
        />
      </Container>
    </PluginScreenLayout>
  )
}

export default Finance
