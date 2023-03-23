import { COLORS, SPACING } from 'app/theme/theme'
import { UseModalReturnType } from 'app/types/useModalReturnType'
import { useBottomSheetDynamicSnapPoints } from 'axelra-react-native-bottom-sheet'
import { alpha } from 'axelra-react-native-utilities'
import { useCallback, useMemo, useState } from 'react'
import { interpolateColor, useAnimatedStyle, useSharedValue } from 'react-native-reanimated'

type Props = {
  snapPoints: Array<string | number>
  initialIndex?: number
}

const defaultBgColor = alpha(0, COLORS.WHITE)
const activeBgColor = alpha(0.5, COLORS.BLACK)

const indicatorStyle = {
  backgroundColor: alpha(0.1, COLORS.BLACK),
  width: SPACING * 6,
  height: SPACING / 2,
}

export const useModal = ({ snapPoints, initialIndex }: Props): UseModalReturnType => {
  const { animatedSnapPoints, animatedHandleHeight, handleContentLayout, animatedContentHeight } =
    useBottomSheetDynamicSnapPoints(snapPoints ?? ['CONTENT_HEIGHT'])

  const animatedIndex = useSharedValue(-1)
  const [isOpen, setIsOpen] = useState(initialIndex !== -1)

  const onAnimate = useCallback(
    (from: number, to: number) => {
      if (initialIndex === undefined)
        throw new Error('You cannot use state handler without providing an initial index')
      if (to === -1) return setIsOpen(false)
      return setIsOpen(true)
    },
    [initialIndex]
  )

  const containerStyle = useAnimatedStyle(() => {
    return {
      backgroundColor: interpolateColor(
        animatedIndex.value,
        [-1, animatedSnapPoints.value.length],
        [defaultBgColor, activeBgColor]
      ),
    }
  })

  return useMemo(
    () => ({
      snapPoints: snapPoints.includes('CONTENT_HEIGHT') ? animatedSnapPoints : snapPoints,
      animatedIndex,
      handleHeight: animatedHandleHeight,
      contentHeight: animatedContentHeight,
      containerStyle,
      handleIndicatorStyle: indicatorStyle,
      onLayout: handleContentLayout,
      stateHandler: { isOpen, onAnimate },
    }),
    [
      animatedContentHeight,
      animatedHandleHeight,
      animatedIndex,
      animatedSnapPoints,
      containerStyle,
      handleContentLayout,
      isOpen,
      onAnimate,
      snapPoints,
    ]
  )
}
