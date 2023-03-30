import { useMemo } from 'react'
import { Dimensions } from 'react-native'

export const useWindowDimensions = () => {
  const width = useMemo(() => Dimensions.get('window').width, [])
  const height = useMemo(() => Dimensions.get('window').height, [])

  return useMemo(
    () => ({
      windowWidth: width,
      windowHeight: height,
    }),
    []
  )
}
