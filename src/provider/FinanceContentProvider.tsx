import React, {
  createContext,
  PropsWithChildren,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react'
import { FinanceCreateSpendingRequest, FinanceGetInvestmentResponse } from '../../api/openapi'
import { api } from '../../api/requests'
import { useUser } from '../hooks/useUser'
import { useOnboarding } from './OnboardingProvider'

type FinanceContentType = {
  saveSpending: (spending: FinanceCreateSpendingRequest) => void
  getSpendings: () => void
  spendings: FinanceGetInvestmentResponse[]
  aggregatedSpendings: number
  aggregateSavings: number
}

const FinanceContext = createContext<FinanceContentType>({} as FinanceContentType)

export const useFinance = () => useContext(FinanceContext)

const useProvideFinance = (): FinanceContentType => {
  const [spendings, setSpendings] = useState<FinanceGetInvestmentResponse[]>([])
  const { user } = useUser()
  const { settings } = useOnboarding()

  const getSaving = useCallback(
    (amount: number) => {
      console.log(settings)
      if (!settings?.finance?.strategy || !settings.finance.strategyAmount) return 0
      switch (settings?.finance.strategy) {
        case 'Percent':
          return amount * (settings.finance.strategyAmount / 100)
        case 'Plus':
          return settings.finance.strategyAmount
        default:
          return (
            Math.ceil(amount / settings.finance.strategyAmount) * settings.finance.strategyAmount -
            amount
          )
      }
    },
    [settings]
  )

  const saveSpending = useCallback(
    async (spending: FinanceCreateSpendingRequest) => {
      if (!user?.id) return
      if (!spending.amount) return
      try {
        await api.financeApi.financePost(user?.id, {
          amount: spending.amount,
          saving: 100,
          description: spending.description,
          spendingTime: spending.spendingTime,
        })
      } catch (e) {
        console.log(e)
      }
    },
    [user?.id]
  )

  const getSpendings = useCallback(async () => {
    if (!user?.id) return
    try {
      const { data } = await api.financeApi.financeGet(user?.id)
      // @ts-ignore
      setSpendings(data.reverse())
    } catch (e) {
      console.log(e)
    }
  }, [user?.id])

  const aggregatedSpendings = useMemo(() => {
    let dailySpendings = 0
    spendings.forEach((spending) => spending.amount && (dailySpendings += spending.amount))
    return dailySpendings
  }, [spendings])

  const aggregateSavings = useMemo(() => {
    let savings = 0
    spendings.forEach((spending) => {
      spending.amount && getSaving(spending.amount)
    })
    return savings
  }, [getSaving, spendings])

  useEffect(() => {
    getSpendings()
  }, [getSpendings])

  return { saveSpending, getSpendings, spendings, aggregateSavings, aggregatedSpendings }
}

export const FinanceProvider = ({ children }: PropsWithChildren) => {
  const providedFinanceProps = useProvideFinance()
  return (
    <>
      <FinanceContext.Provider value={providedFinanceProps}>{children}</FinanceContext.Provider>
    </>
  )
}
