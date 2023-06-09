import type { SharedValue } from 'react-native-reanimated'

export type UseModalReturnType = {
  handleHeight: SharedValue<number>
  onLayout: ({
    nativeEvent: {
      layout: { height },
    },
  }: any) => void
  stateHandler: {
    onAnimate: (from: number, to: number) => void
    isOpen: boolean
  }
  containerStyle: { backgroundColor: string }
  animatedIndex: SharedValue<number>
  handleIndicatorStyle: {
    backgroundColor: string
    width: number
    height: number
  }
  snapPoints: (string | number)[] | Readonly<{ value: (string | number)[] }>
  contentHeight: SharedValue<number>
}
