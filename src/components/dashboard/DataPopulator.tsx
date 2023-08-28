import { useCallback } from 'react'
import { useUser } from '../../hooks/useUser'
import Button from '../ui/Button'
import { api } from "../../../api/requests";
import React from 'react';

const DataPopulator = () => {

  const { user } = useUser();

  const fetchPayload = async (filename: string) => {
    const response = await fetch(`/sample_data/${filename}.json`)
    const data = await response.json()
    return data
  }

  const populateSettings = useCallback(async () => {
    if (!user?.id) return

    try {
      const settingsPayload = await fetchPayload('settings')
      await api.settingsApi.settingsPost(user.id, settingsPayload)
    } catch (e) {
      console.log(e)
    }
  }, [user?.id])

  const populateMeditation = useCallback(async () => {
    if (!user?.id) return

    try {
      const meditationPayload = await fetchPayload('meditation')
      await api.meditationApi.meditationPost(user.id, meditationPayload)
    } catch (e) {
      console.log(e)
    }
  }, [user?.id])

  const populateFinance = useCallback(async () => {
    if (!user?.id) return

    try {
      const financePayload = await fetchPayload('finance')
      await api.financeApi.financePost(user.id, financePayload)
    } catch (e) {
      console.log(e)
    }
  }, [user?.id])

  const handlePopulateData = async () => {
    await Promise.all([
      populateSettings(),
      populateMeditation(),
      populateFinance(),
    ])
    console.log("Pressed")
    alert('Data has been populated!')
  }

  return <Button small buttonType={'black'} onPress={handlePopulateData}>Populate Data</Button>
}

export default DataPopulator
