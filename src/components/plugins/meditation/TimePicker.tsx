import DateTimePicker from '@react-native-community/datetimepicker'
import Slider from '@react-native-community/slider'
import React, { useEffect, useState } from 'react'
import { Platform } from 'react-native'
import { EXTRA_COLORS } from '../../../theme/theme'

type Props = {
  difference: number
  setDifference: (time: number) => void
}
const TimePicker = ({ setDifference, difference }: Props) => {
  const [time, setTime] = useState(new Date())

  const [sliderValue, setSliderValue] = useState(2)

  useEffect(() => {
    setTime(new Date())
  }, [])

  return Platform.OS === 'ios' ? (
    <DateTimePicker
      value={time}
      mode={'countdown'}
      display={'spinner'}
      onChange={(_, t) => {
        if (t) {
          const difference = t.getMinutes() * 60 + t.getHours() * 3600
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
  ) : (
    <Slider
      style={{ width: '100%', height: 50 }}
      minimumValue={1}
      maximumValue={70}
      value={sliderValue}
      step={1}
      onValueChange={setSliderValue}
      thumbTintColor={EXTRA_COLORS.BLUE}
      minimumTrackTintColor={EXTRA_COLORS.BLUE}
      maximumTrackTintColor="#000000"
    />
  )
}

export default TimePicker
