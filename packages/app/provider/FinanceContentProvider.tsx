import { useUser } from 'app/hooks/useUser'
import React, {
  createContext,
  PropsWithChildren,
  useCallback,
  useContext,
  useEffect,
  useState,
} from 'react'

type Spending = {
  amount: number
  date: number
  text: string
}

type FinanceContentType = {
  saveSpending: (Spending) => void
  getSpendings: () => void
  spendings: Spending[]
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

  useEffect(() => {
    getSpendings()
  }, [getSpendings])

  return { saveSpending, getSpendings, spendings }
}

export const FinanceProvider = ({ children }: PropsWithChildren) => {
  const providedFinanceProps = useProvideFinance()
  return (
    <>
      <FinanceContext.Provider value={providedFinanceProps}>{children}</FinanceContext.Provider>
    </>
  )
}
