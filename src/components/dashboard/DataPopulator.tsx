import React, { useCallback, useMemo } from 'react'
import { SettingsCreateSettingsRequest, SettingsNotificationType } from '../../../api/openapi'
import { api } from '../../../api/requests'
import { useUser } from '../../hooks/useUser'
import { useAuthentication } from '../../provider/AuthenticationProvider'
import { useElevator } from '../../provider/ElevatorContentProvider'
import { useFinance } from '../../provider/FinanceContentProvider'
import { useLevels } from '../../provider/LevelProvider'
import { useMeditate } from '../../provider/MeditationContentProvider'
import Button from '../ui/Button'
import { useLoadingOverlay } from './LoadingOverlayContainer'

const DataPopulator = () => {
  const { user } = useUser()
  const { getSpendings } = useFinance()
  const { getLevels } = useLevels()
  const { getMeditations } = useMeditate()
  const { getUser } = useAuthentication()
  const { saveElevatorSession, getElevatorSessions } = useElevator()
  const { setLoading } = useLoadingOverlay()

  const settingsData: SettingsCreateSettingsRequest = useMemo(
    () => ({
      elevator: {
        amountNotifications: 0,
        goal: 10,
        notifications: true,
        periodNotifications: 'Day' as SettingsNotificationType,
      },
      enabledPlugins: ['finance', 'meditation', 'elevator'],
      finance: {
        amountNotifications: 0,
        investmentGoal: 600,
        investmentTimeGoal: 10,
        notifications: true,
        periodNotifications: 'Day' as SettingsNotificationType,
        strategy: 'Percent',
        strategyAmount: 5,
      },
      meditation: {
        amountNotifications: 0,
        meditationTimeGoal: 170000,
        notifications: true,
        periodNotifications: 'Day' as SettingsNotificationType,
      },
    }),
    []
  )

  const meditationDataArray = useMemo(
    () => [
      { endTime: 1672445500, meditationTime: 1395 },
      { endTime: 1672618430, meditationTime: 1338 },
      { endTime: 1672704670, meditationTime: 1496 },
      { endTime: 1672963866, meditationTime: 1617 },
      { endTime: 1673050441, meditationTime: 1317 },
      { endTime: 1673136618, meditationTime: 1666 },
      { endTime: 1673482226, meditationTime: 1436 },
      { endTime: 1673828088, meditationTime: 1528 },
      { endTime: 1673914238, meditationTime: 1424 },
      { endTime: 1674432622, meditationTime: 1379 },
      { endTime: 1674864681, meditationTime: 1608 },
      { endTime: 1675469674, meditationTime: 1548 },
    ],
    []
  )

  const financeDataArray = useMemo(
    () => [
      {
        amount: 218,
        description: 'Electronics',
        saving: 5,
        spendingTime: Math.floor(new Date().getTime() / 1000),
      },
      {
        amount: 446,
        description: 'Electronics',
        saving: 17,
        spendingTime: Math.floor(new Date().getTime() / 1000) - 86400,
      },
      {
        amount: 292,
        description: 'Utilities',
        saving: 6,
        spendingTime: Math.floor(new Date().getTime() / 1000) - 86400,
      },
      {
        amount: 226,
        description: 'Electronics',
        saving: 11,
        spendingTime: Math.floor(new Date().getTime() / 1000) - 86400 * 3,
      },
      {
        amount: 251,
        description: 'Utilities',
        saving: 20,
        spendingTime: Math.floor(new Date().getTime() / 1000) - 86400 * 4,
      },
      {
        amount: 203,
        description: 'Electronics',
        saving: 16,
        spendingTime: Math.floor(new Date().getTime() / 1000) - 86400 * 3,
      },
      {
        amount: 58,
        description: 'Groceries',
        saving: 17,
        spendingTime: Math.floor(new Date().getTime() / 1000) - 86400 * 2,
      },
      {
        amount: 453,
        description: 'Utilities',
        saving: 4,
        spendingTime: Math.floor(new Date().getTime() / 1000) - 86400 * 2,
      },
      {
        amount: 168,
        description: 'Groceries',
        saving: 10,
        spendingTime: Math.floor(new Date().getTime() / 1000) - 86400 * 2,
      },
      {
        amount: 563,
        description: 'Fun',
        saving: 2,
        spendingTime: Math.floor(new Date().getTime() / 1000) - 86400 * 2,
      },
      {
        amount: 271,
        description: 'Utilities',
        saving: 17,
        spendingTime: Math.floor(new Date().getTime() / 1000) - 86400 * 2,
      },
      {
        amount: 592,
        description: 'Electronics',
        saving: 10,
        spendingTime: Math.floor(new Date().getTime() / 1000) - 86400 * 2,
      },
      {
        amount: 239,
        description: 'Electronics',
        saving: 7,
        spendingTime: Math.floor(new Date().getTime() / 1000) - 86400 * 5,
      },
      {
        amount: 199,
        description: 'Rent',
        saving: 15,
        spendingTime: Math.floor(new Date().getTime() / 1000) - 86400 * 5,
      },
      {
        amount: 536,
        description: 'Utilities',
        saving: 2,
        spendingTime: Math.floor(new Date().getTime() / 1000) - 86400 * 5,
      },
      {
        amount: 271,
        description: 'Utilities',
        saving: 12,
        spendingTime: Math.floor(new Date().getTime() / 1000) - 86400 * 4,
      },
      {
        amount: 164,
        description: 'Utilities',
        saving: 13,
        spendingTime: Math.floor(new Date().getTime() / 1000) - 86400 * 5,
      },
      {
        amount: 573,
        description: 'Rent',
        saving: 15,
        spendingTime: Math.floor(new Date().getTime() / 1000) - 86400 * 4,
      },
      {
        amount: 408,
        description: 'Fun',
        saving: 16,
        spendingTime: Math.floor(new Date().getTime() / 1000) - 86400 * 4,
      },
      {
        amount: 306,
        description: 'Rent',
        saving: 16,
        spendingTime: Math.floor(new Date().getTime() / 1000) - 86400 * 7,
      },
      {
        amount: 319,
        description: 'Utilities',
        saving: 18,
        spendingTime: Math.floor(new Date().getTime() / 1000) - 86400 * 7,
      },
      {
        amount: 253,
        description: 'Rent',
        saving: 16,
        spendingTime: Math.floor(new Date().getTime() / 1000) - 86400 * 6,
      },
    ],
    []
  )

  const populateSettings = useCallback(async () => {
    if (!user?.id) return
    try {
      // First, delete the existing settings
      await api.settingsApi.settingsDelete(user.id)

      // Then, create new settings
      await api.settingsApi.settingsPost(user.id, settingsData)
    } catch (e) {
      console.log(e)
    }
  }, [user?.id, settingsData])

  const populateMeditation = useCallback(async () => {
    if (!user?.id) return
    try {
      for (const meditationData of meditationDataArray) {
        await api.meditationApi.meditationPost(user.id, meditationData)
      }
    } catch (e) {
      console.log(e)
    }
  }, [user?.id, meditationDataArray])

  const populateFinance = useCallback(async () => {
    if (!user?.id) return
    try {
      for (const financeData of financeDataArray) {
        await api.financeApi.financePost(user.id, financeData)
      }
    } catch (e) {
      console.log(e)
    }
  }, [user?.id, financeDataArray])

  const populateElevator = useCallback(async () => {
    try {
      await saveElevatorSession({ stairs: true, amountStairs: 5, heightGain: 40 })
      await saveElevatorSession({ stairs: true, amountStairs: 15, heightGain: 70 })
      await saveElevatorSession({ stairs: false, amountStairs: 0, heightGain: 40 })
    } catch (e) {
      console.log(e)
    }
  }, [saveElevatorSession])

  const handlePopulateData = async () => {
    setLoading(true)
    //await Promise.all([populateSettings(), populateMeditation(), populateFinance()]);
    await populateSettings()
    await populateMeditation()
    await populateFinance()
    await populateElevator()
    await getSpendings()
    await getMeditations()
    await getUser()
    await getLevels()
    await getElevatorSessions()
    setLoading(false)

    //await Promise.all([getSpendings(), getMeditations(), getUser(), getLevels()])
    alert('Data has been populated!')
  }

  return (
    <Button small buttonType={'black'} onPress={handlePopulateData}>
      Add Test Data
    </Button>
  )
}

export default DataPopulator
