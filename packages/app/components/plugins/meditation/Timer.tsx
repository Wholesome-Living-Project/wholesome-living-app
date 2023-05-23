import { meditateTimePickerModalRef, signUpModalRef } from 'app/components/refs/modal-refs'
import Button from 'app/components/ui/Button'
import Spacer from 'app/components/ui/Spacer'
import { displayTime } from 'app/helpers/timerHelpers'
import { useMeditate } from 'app/provider/MeditationContentProvider'
import { COLORS, OUTER_BORDER_RADIUS } from 'app/theme/theme'
import { Heading1 } from 'app/theme/typography'
import { alpha } from 'axelra-react-native-utilities'
import { Audio } from 'expo-av'
import React, { useCallback, useEffect, useMemo, useState } from 'react'
import { Button as NativeButton, TouchableOpacity, View } from 'react-native'
import styled from 'styled-components'

const TimerContainer = styled(View)`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`

const TimerBackground = styled(TouchableOpacity)`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  border-radius: ${OUTER_BORDER_RADIUS}px;
  background: ${alpha(0.6, COLORS.SECONDARY)};
`

type Props = {
  onTimerEnded: (time: number) => void
}

const Timer = ({ onTimerEnded }: Props) => {
  const [isTimerStart, setIsTimerStart] = useState(false)
  const [timerDuration, setTimerDuration] = useState<number>(60)
  const { timerDifference } = useMeditate()
  const [countDownInterval, setCountDownInterval] = useState<NodeJS.Timer>()

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
    setTimerDuration(timerDifference)
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
      onTimerEnded(timerDuration)
    }
  }, [pauseTimer, handleTimerAtZero, timerDuration, onTimerEnded])

  const openTimePicker = useCallback(() => {
    meditateTimePickerModalRef.current?.expand()
  }, [signUpModalRef])

  useEffect(() => {
    setTimerDuration(timerDifference)
  }, [timerDifference])

  return (
    <>
      <TimerContainer>
        <TimerBackground onPress={() => openTimePicker()}>
          <Heading1>{displayTime(timerDuration)}</Heading1>
        </TimerBackground>
        <Spacer x={4} />
        <Button
          buttonType={isTimerStart ? 'cta' : 'primary'}
          fullWidth
          disabled={timerIsZero}
          onPress={!isTimerStart ? startTimer : pauseTimer}
          small>
          {!isTimerStart ? 'Start' : 'Stop'}
        </Button>
        <Spacer x={2} />
        <Button
          buttonType={'secondary'}
          disabled={timerDuration === timerDifference && !isTimerStart}
          fullWidth
          small
          onPress={resetTimer}
          border>
          Reset
        </Button>
        <Spacer x={2} />
        <NativeButton
          title={"I'm finished"}
          color={COLORS.PRIMARY}
          disabled={!isTimerStart && timerDuration === timerDifference}
          onPress={() => {
            onTimerEnded(timerDifference - timerDuration)
            resetTimer()
          }}
        />
      </TimerContainer>
    </>
  )
}

export default Timer
