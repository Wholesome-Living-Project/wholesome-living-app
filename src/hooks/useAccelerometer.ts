import { Subscription } from 'expo-modules-core'
import { Accelerometer } from 'expo-sensors'
import { useCallback, useEffect, useRef, useState } from 'react'
import { useEffectOnce } from './useEffectOnce'

const ELEVATOR_SPEED_THRESHOLD = 0.5
const STAIRS_SPEED_THRESHOLD = 1.5
const LONG_RIDE_ELEVATION_CHANGE_THRESHOLD = 0.5

const useAccelerometer = () => {
  const [{ x, y, z }, setData] = useState({
    x: 0,
    y: 0,
    z: 0,
  })
  const [subscription, setSubscription] = useState<Subscription>()
  const intervalRef = useRef<NodeJS.Timeout | undefined>()
  const [zHistory, setZHistory] = useState<number[]>([])
  const checkMovementRef = useRef<() => void>()

  const _subscribe = () => {
    setSubscription(Accelerometer.addListener(setData))
  }

  useEffectOnce(() => {
    setSubscription(Accelerometer.addListener(setData))
    Accelerometer.setUpdateInterval(1000)
  })

  useEffect(() => {
    _subscribe()
    return () => {
      subscription && subscription.remove()
      setSubscription(undefined)
    }
  }, [subscription])

  /*  useEffect(() => {
    /!*saveElevatorSession({heightGain: z})*!/
  }, [x, y, z, saveElevatorSession])*/

  useEffect(() => {
    setZHistory((prev) => [...prev, y].slice(-60)) // Store the last 60 seconds of z values
  }, [y])

  const checkMovement = useCallback(() => {
    const historyLength = zHistory.length
    if (historyLength < 2) return

    // Calculate the rate of change of z values
    const deltaZs = zHistory.map((value, index, array) => {
      if (index === 0) return 0
      return value - array[index - 1]!
    })

    // Calculate the average speed of elevation change
    const avgSpeed = deltaZs.reduce((acc, val) => acc + val, 0) / historyLength

    console.log(zHistory)
    // Determine the type of movement based on the average speed and total elevation change
    const totalElevationChange = zHistory[historyLength - 1]! - zHistory[0]!
    console.log(avgSpeed, totalElevationChange)
    if (Math.abs(avgSpeed) > ELEVATOR_SPEED_THRESHOLD) {
      if (Math.abs(totalElevationChange) > LONG_RIDE_ELEVATION_CHANGE_THRESHOLD) {
        console.log('long elevator ride')
      } else {
        console.log('short elevator ride')
      }
    } else if (Math.abs(avgSpeed) > STAIRS_SPEED_THRESHOLD) {
      if (Math.abs(totalElevationChange) > LONG_RIDE_ELEVATION_CHANGE_THRESHOLD) {
        console.log('long stairs climb')
      } else {
        console.log('short stairs climb')
      }
    } else {
      console.log('no vertical movement')
    }
  }, [zHistory])

  useEffect(() => {
    checkMovementRef.current = checkMovement
  }, [checkMovement])

  useEffect(() => {
    console.log('set interval')
    const intervalCallback = () => {
      if (checkMovementRef.current) {
        checkMovementRef.current()
      }
    }
    intervalRef.current = setInterval(intervalCallback, 10000) // Check every 10 seconds

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
      }
    }
  }, [])
}

export default useAccelerometer
