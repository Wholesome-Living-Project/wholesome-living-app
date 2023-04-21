import TimePicker from 'app/components/plugins/meditation/TimePicker'
import { meditateTimePickerModalRef } from 'app/components/refs/modal-refs'
import { BottomSheetViewFlex } from 'app/components/ui/BottomSheetViewFlex'
import Button from 'app/components/ui/Button'
import { Flex } from 'app/components/ui/Flex'
import Spacer from 'app/components/ui/Spacer'
import { useModal } from 'app/hooks/useModal'
import { useMeditate } from 'app/provider/MeditationContentProvider'
import { Heading5 } from 'app/theme/typography'
import BottomSheet from 'axelra-react-native-bottom-sheet'
import React, { useCallback, useEffect, useState } from 'react'
import { Keyboard, Platform } from 'react-native'
import styled from 'styled-components'

const BASE_MODAL_HEIGHT = 50
const ADD_KEYBARD_HEIGHT = 30

const ContentWrapper = styled(Flex)`
  padding: 10px 30px;
`

type Props = {
  title?: string
}
const TimePickerModal = ({ title }: Props) => {
  const [modalHeight, setModalHeight] = useState(BASE_MODAL_HEIGHT)
  const { setTimerDifference } = useMeditate()

  const modalProps = useModal({ snapPoints: [`${modalHeight}%`] })

  const onModalClose = useCallback(() => {
    if (Platform.OS === 'ios') {
      Keyboard.dismiss()
    }
  }, [])

  useEffect(() => {
    Keyboard.addListener('keyboardWillShow', () =>
      setModalHeight(ADD_KEYBARD_HEIGHT + BASE_MODAL_HEIGHT)
    )
    Keyboard.addListener('keyboardWillHide', () => setModalHeight(BASE_MODAL_HEIGHT))
  }, [])

  const [currentDifference, setCurrentDifference] = useState<number>(0)

  return (
    <BottomSheet
      ref={meditateTimePickerModalRef}
      index={-1}
      enablePanDownToClose
      onClose={onModalClose}
      style={{ zIndex: 1000 }}
      {...modalProps}>
      <BottomSheetViewFlex flex={1} justify={'center'} column>
        <ContentWrapper>
          <Heading5>{title}</Heading5>
          <TimePicker difference={currentDifference} setDifference={setCurrentDifference} />
          <Spacer x={2} />
          <Button
            onPress={() => {
              setTimerDifference(currentDifference)
              meditateTimePickerModalRef.current?.close()
            }}>
            Done
          </Button>
        </ContentWrapper>
      </BottomSheetViewFlex>
    </BottomSheet>
  )
}
export default TimePickerModal
