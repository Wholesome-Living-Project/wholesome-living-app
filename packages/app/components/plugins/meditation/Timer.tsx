import TimePicker from 'app/components/plugins/meditation/TimePicker'
import Button from 'app/components/ui/Button'
import Spacer from 'app/components/ui/Spacer'
import { displayTime } from 'app/helpers/timerHelpers'
import { COLORS, OUTER_BORDER_RADIUS, SPACING } from 'app/theme/theme'
import { Heading1 } from 'app/theme/typography'
import { alpha } from 'axelra-react-native-utilities'
import { Audio } from 'expo-av'
import React, { useCallback, useEffect, useMemo, useState } from 'react'
import { TouchableOpacity, View } from 'react-native'
import styled from 'styled-components'

const TimerContainer = styled(View)`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: ${SPACING}px;
`

const TimerBackground = styled(TouchableOpacity)`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  border-radius: ${OUTER_BORDER_RADIUS}px;
  padding: ${SPACING}px ${SPACING * 2}px;
  background: ${alpha(0.6, COLORS.SECONDARY)};
`

const Timer = () => {
  const [isTimerStart, setIsTimerStart] = useState(false)
  const [timerDuration, setTimerDuration] = useState(3)
  const [currentlySetTimer, setCurrentlySetTimer] = useState(3)
  const [countDownInterval, setCountDownInterval] = useState<NodeJS.Timer>()
  const [timerInputActive, setTimerInputActive] = useState(false)

  const [sound, setSound] = useState<Audio.Sound>()

  const timerIsZero = useMemo(() => {
    return timerDuration <= 0
  }, [timerDuration])

  const playSound = useCallback(async () => {
    const { sound } = await Audio.Sound.createAsync(
      require('../../../../assets/sounds/meditation-done.mp3')
    )
    setSound(sound)
    await sound.playAsync()
  }, [])

  useEffect(() => {
    return sound
      ? () => {
          sound.unloadAsync()
        }
      : undefined
  }, [sound])

  const startTimer = useCallback(() => {
    setIsTimerStart(true)
    const interval = setInterval(() => setTimerDuration((st) => st - 1), 1000)
    setCountDownInterval(interval)
  }, [setCountDownInterval, setIsTimerStart, setTimerDuration])

  const pauseTimer = useCallback(() => {
    clearInterval(countDownInterval)
    setIsTimerStart(false)
  }, [countDownInterval])

  const resetTimer = useCallback(() => {
    pauseTimer()
    setTimerDuration(currentlySetTimer)
  }, [pauseTimer, setTimerDuration])

  useEffect(() => {
    return () => clearInterval(countDownInterval)
  }, [setTimerDuration])

  const handleTimerAtZero = useCallback(() => {
    playSound()
  }, [timerDuration, pauseTimer, playSound])

  useEffect(() => {
    if (timerIsZero) {
      pauseTimer()
      handleTimerAtZero()
    }
  }, [pauseTimer, handleTimerAtZero, timerDuration])

  return (
    <TimerContainer>
      <TimerBackground onPress={() => setTimerInputActive((st) => !st)}>
        {timerInputActive ? <TimePicker /> : <Heading1>{displayTime(timerDuration)}</Heading1>}
      </TimerBackground>
      <Spacer x={3} />
      <Button
        buttonType={isTimerStart ? 'cta' : 'primary'}
        fullWidth
        disabled={timerIsZero}
        onPress={!isTimerStart ? startTimer : pauseTimer}>
        {!isTimerStart ? 'Start' : 'Stop'}
      </Button>
      <Spacer x={3} />
      <Button
        buttonType={'secondary'}
        disabled={timerDuration === currentlySetTimer && !isTimerStart}
        fullWidth
        onPress={resetTimer}>
        Reset
      </Button>
    </TimerContainer>
  )
}

export default Timer
