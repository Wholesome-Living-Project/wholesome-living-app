import DateTimePicker from '@react-native-community/datetimepicker'
import React, { useEffect, useMemo, useState } from 'react'
import { Platform } from 'react-native'

type Props = {
  difference: number
  setDifference: (time: number) => void
}
const TimePicker = ({ setDifference, difference }: Props) => {
  const [time, setTime] = useState(new Date())
  const hours = useMemo(() => time.getHours(), [time])
  const minutes = useMemo(() => time.getMinutes(), [time])
  const seconds = useMemo(() => time.getSeconds(), [time])

  useEffect(() => {
    setTime(new Date())
  }, [])

  return (
    <DateTimePicker
      value={Platform.OS === 'android' ? new Date(0, 0, 0, hours, minutes, seconds) : new Date(0)}
      mode={Platform.OS === 'ios' ? 'countdown' : 'time'}
      display={'spinner'}
      onChange={(_, t) => {
        if (t) {
          const difference =
            Platform.OS === 'ios'
              ? t.getMinutes() * 60 + t.getHours() * 3600
              : t.getMinutes() -
                new Date().getMinutes() +
                t.getHours() * 60 -
                new Date().getHours() * 60

          setTime(t)
          if (difference) {
            if (difference > 0) {
              setDifference(difference)
            } else {
              setDifference(24 * 60 - difference * -1)
            }
          }
        }
      }}
    />
  )
}

export default TimePicker
