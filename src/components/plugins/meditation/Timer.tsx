import { Feather } from '@expo/vector-icons'
import Slider from '@react-native-community/slider'
import { alpha } from 'axelra-react-native-utilities'
import { Audio } from 'expo-av'
import React, { useCallback, useEffect, useMemo, useState } from 'react'
import { Button as NativeButton, TouchableOpacity, View } from 'react-native'
import styled from 'styled-components'
import { Flex } from '../../../components/ui/Flex'
import { formatTimeMeditation } from '../../../helpers/formatTimeMeditation'
import { displayTime } from '../../../helpers/timerHelpers'
import { useMeditate } from '../../../provider/MeditationContentProvider'
import { COLORS, OUTER_BORDER_RADIUS, SPACING } from '../../../theme/theme'
import { Heading1, Heading3 } from '../../../theme/typography'
import { meditateTimePickerModalRef } from '../../refs/modal-refs'
import Button from '../../ui/Button'
import Spacer from '../../ui/Spacer'

const TimerContainer = styled(View)`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`

const TimerBackground = styled(TouchableOpacity)`
  display: flex;
  padding: ${SPACING}px ${SPACING * 2}px;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  border-radius: ${OUTER_BORDER_RADIUS}px;
  background: ${alpha(0.6, COLORS.SECONDARY)};
`

const IconPad = styled(TouchableOpacity)`
  padding: ${SPACING}px;
  justify-content: center;
`

type Props = {
  onTimerEnded: (time: number) => void
}
const minsToSecs = (mins: number) => mins * 60

const secsToMins = (mins: number) => Math.trunc(mins / 60)

const Timer = ({ onTimerEnded }: Props) => {
  const [isTimerStart, setIsTimerStart] = useState(false)

  const [timerTemp, setTempTimer] = useState<number>(minsToSecs(1))
  const [timerDuration, setTimerDuration] = useState<number>(minsToSecs(1))
  const [timerHistory, setTimerHistory] = useState<number>(minsToSecs(1))

  const { timerDifference } = useMeditate()
  const [countDownInterval, setCountDownInterval] = useState<NodeJS.Timer>()

  const [sound, setSound] = useState<Audio.Sound>()

  const [showSlider, setShowSlider] = useState(false)

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
    setTimerDuration(timerHistory)
  }, [pauseTimer, timerHistory])

  useEffect(() => {
    return () => clearInterval(countDownInterval)
  }, [countDownInterval, setTimerDuration])

  const handleTimerAtZero = useCallback(() => {
    playSound()
  }, [playSound])

  useEffect(() => {
    if (timerIsZero) {
      pauseTimer()
      handleTimerAtZero()
      onTimerEnded(timerDifference)
    }
  }, [pauseTimer, handleTimerAtZero, timerDuration, onTimerEnded, timerIsZero, timerDifference])

  const openTimePicker = useCallback(() => {
    meditateTimePickerModalRef.current?.expand()
  }, [])

  useEffect(() => {
    setTimerDuration(timerDifference)
  }, [timerDifference])

  return (
    <>
      <TimerContainer>
        {!showSlider ? (
          <Flex row justify="center" align="center">
            <TimerBackground
              onPress={() => {
                setTimerHistory(timerDuration)
                setTempTimer(timerDuration)
                setShowSlider(true)
              }}>
              <Heading1>{displayTime(timerDuration)}</Heading1>
            </TimerBackground>
            <IconPad
              onPress={() => {
                setTimerHistory(timerDuration)
                setTempTimer(timerDuration)
                setShowSlider(true)
              }}>
              <Feather name="settings" size={24} color="black" />
            </IconPad>
          </Flex>
        ) : (
          <>
            <Heading3>{formatTimeMeditation(secsToMins(timerTemp))}</Heading3>
            <Flex row>
              <Slider
                style={{ width: '100%', height: 50 }}
                minimumValue={minsToSecs(1)}
                maximumValue={minsToSecs(70)}
                value={timerTemp}
                step={1}
                onValueChange={(value) => setTempTimer(value)}
                thumbTintColor={COLORS.PRIMARY}
                minimumTrackTintColor={COLORS.SECONDARY}
                maximumTrackTintColor="#000000"
              />
            </Flex>
          </>
        )}
        <Spacer x={4} />
        {!showSlider ? (
          <>
            <Button
              buttonType={isTimerStart ? 'cta' : 'black'}
              fullWidth
              small
              disabled={timerIsZero}
              onPress={!isTimerStart ? startTimer : pauseTimer}>
              {!isTimerStart ? 'Start' : 'Stop'}
            </Button>
            <Spacer x={2} />
            <Button
              small
              buttonType={'secondary'}
              disabled={timerDuration === timerDifference && !isTimerStart}
              fullWidth
              onPress={resetTimer}
              border>
              Reset
            </Button>
            <Spacer x={2} />
            <NativeButton
              title={"I'm finished"}
              color={COLORS.PRIMARY}
              disabled={(!isTimerStart && timerDuration === timerDifference) || timerIsZero}
              onPress={() => {
                onTimerEnded(timerDifference - timerDuration)
                resetTimer()
              }}
            />
          </>
        ) : (
          <>
            <Button
              buttonType={'black'}
              fullWidth
              small
              disabled={timerTemp === timerHistory}
              onPress={() => {
                setTimerDuration(timerTemp - (timerTemp % 60))
                setTimerHistory(timerTemp - (timerTemp % 60))
                setShowSlider(false)
              }}>
              Set
            </Button>
            <Spacer x={2} />
            <Button
              small
              buttonColor={COLORS.DARK_GREY}
              fullWidth
              onPress={() => setShowSlider(false)}
              border>
              Cancel
            </Button>
            <Spacer x={2} />
          </>
        )}
      </TimerContainer>
    </>
  )
}

export default Timer
