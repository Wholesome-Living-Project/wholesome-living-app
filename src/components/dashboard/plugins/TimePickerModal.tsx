import BottomSheet from 'axelra-react-native-bottom-sheet'
import React, { useCallback, useEffect, useState } from 'react'
import { Keyboard, Platform } from 'react-native'
import styled from 'styled-components'
import TimePicker from '../../../components/plugins/meditation/TimePicker'
import { useModal } from '../../../hooks/useModal'
import { useMeditate } from '../../../provider/MeditationContentProvider'
import { Heading5 } from '../../../theme/typography'
import { meditateTimePickerModalRef } from '../../refs/modal-refs'
import { BottomSheetViewFlex } from '../../ui/BottomSheetViewFlex'
import Button from '../../ui/Button'
import { Flex } from '../../ui/Flex'
import Spacer from '../../ui/Spacer'

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
      enablePanDownToClose={false}
      enableOverDrag={false}
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
