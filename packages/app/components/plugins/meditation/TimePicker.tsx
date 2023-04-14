import DateTimePicker from '@react-native-community/datetimepicker'
import { Heading5 } from 'app/theme/typography'
import React, { useState } from 'react'
const TimePicker = () => {
  const [time, setTime] = useState<Date>(new Date())
  const [difference, setDifference] = useState(0)
  return (
    <>
      <Heading5>{difference}</Heading5>
      <DateTimePicker
        value={time}
        mode={'time'}
        display={'spinner'}
        onChange={(_, t) => {
          t && setTime(t)
          t && setDifference(t.getMinutes() - new Date().getMinutes())
        }}
      />
    </>
  )
}

export default TimePicker
