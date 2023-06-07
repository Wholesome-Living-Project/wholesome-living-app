import BottomSheet from 'axelra-react-native-bottom-sheet'
import React, { useCallback } from 'react'
import { Keyboard, Platform } from 'react-native'
import styled from 'styled-components'
import { useModal } from '../../hooks/useModal'
import { useLevels } from '../../provider/LevelProvider'
import { SPACING } from '../../theme/theme'
import { Heading4 } from '../../theme/typography'
import Tree from '../plugins/Tree'
import { levelModalRef } from '../refs/modal-refs'
import { BottomSheetViewFlex } from '../ui/BottomSheetViewFlex'
import Button from '../ui/Button'
import { Flex } from '../ui/Flex'
import Spacer from '../ui/Spacer'

const Container = styled(Flex)`
  padding: ${SPACING * 2}px ${SPACING * 3}px;
  min-height: 900px;
`

const LevelModal = () => {
  const modalProps = useModal({ snapPoints: [`65%`] })
  const { currentlyInspectedPlugin, experienceMap, levelMap } = useLevels()

  const onModalClose = useCallback(() => {
    if (Platform.OS === 'ios') {
      Keyboard.dismiss()
    }
  }, [])

  return (
    <BottomSheet
      ref={levelModalRef}
      index={-1}
      enablePanDownToClose
      onClose={onModalClose}
      {...modalProps}>
      <BottomSheetViewFlex flex={1} justify={'center'} column>
        <Container>
          <Heading4>Your current Meditation level</Heading4>
          <Tree
            height={350}
            level={currentlyInspectedPlugin ? levelMap?.[currentlyInspectedPlugin] : 1}
            experience={currentlyInspectedPlugin ? experienceMap?.[currentlyInspectedPlugin] : 0}
          />
          <Spacer x={4} />
          <Button buttonType={'black'} onPress={() => levelModalRef.current?.close()}>
            close
          </Button>
        </Container>
      </BottomSheetViewFlex>
    </BottomSheet>
  )
}

export default LevelModal
