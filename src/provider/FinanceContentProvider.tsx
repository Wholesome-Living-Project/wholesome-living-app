import React, {
  createContext,
  PropsWithChildren,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react'
import { useUser } from '../hooks/useUser'

type Spending = {
  amount: number
  date: number
  text: string
}

type FinanceContentType = {
  saveSpending: (Spending) => void
  getSpendings: () => void
  spendings: Spending[]
  aggregatedSpendings: number
  aggregateSavings: number
}

const FinanceContext = createContext<FinanceContentType>({} as FinanceContentType)

export const useFinance = () => useContext(FinanceContext)

const useProvideFinance = (): FinanceContentType => {
  const [spendings, setSpendings] = useState<Spending[]>([])
  const { user } = useUser()

  const saveSpending = useCallback(
    async (sepending: Spending) => {
      if (!user?.id) return
      console.log('saving spending', sepending)

      try {
        // TODO send Data
        setSpendings([sepending, ...spendings])
      } catch (e) {
        console.log(e)
      }
    },
    [spendings, user?.id]
  )

  const getSpendings = useCallback(async () => {
    if (!user?.id) return
    try {
      // TODO get Data from api
    } catch (e) {
      console.log(e)
    }
  }, [user?.id])

  const aggregatedSpendings = useMemo(() => {
    let dailySpendings = 0
    spendings.forEach((spending) => (dailySpendings += spending.amount))
    return dailySpendings
  }, [spendings])

  const aggregateSavings = useMemo(() => {
    let savings = 0
    spendings.forEach((spending) => {
      savings += Math.ceil(spending.amount / 5) * 5 - spending.amount
    })
    return savings
  }, [spendings])

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
