import DateTimePicker from '@react-native-community/datetimepicker'
import { Flex } from 'app/components/ui/Flex'
import { displayTime } from 'app/helpers/timerHelpers'
import { Heading4 } from 'app/theme/typography'
import React, { useState } from 'react'

type Props = {
  difference: number
  setDifference: (time: number) => void
}
const TimePicker = ({ setDifference, difference }: Props) => {
  const [time, setTime] = useState(new Date())
  return (
    <>
      <Flex row flex={1} justify={'center'}>
        <Heading4>{displayTime(difference)} minutes</Heading4>
      </Flex>
      <DateTimePicker
        value={time}
        mode={'time'}
        display={'spinner'}
        onChange={(_, t) => {
          if (t) {
            const difference =
              t.getMinutes() -
              new Date().getMinutes() +
              t.getHours() * 60 -
              new Date().getHours() * 60

            setTime(t)
            if (difference > 0) {
              setDifference(difference)
            } else {
              setDifference(24 * 60 - difference * -1)
            }
          }
        }}
      />
    </>
  )
}

export default TimePicker
