import { FontAwesome5 } from '@expo/vector-icons'
import BottomSheet from 'axelra-react-native-bottom-sheet'
import React, { useCallback } from 'react'
import { Keyboard, Platform } from 'react-native'
import styled from 'styled-components'
import { useModal } from '../../hooks/useModal'
import { useOnboarding } from '../../provider/OnboardingProvider'
import { COLORS, SPACING } from '../../theme/theme'
import { Body, Heading4, Heading6 } from '../../theme/typography'
import { levelComponents } from '../dashboard/Levels'
import { levelExplanationModalRef } from '../refs/modal-refs'
import { BottomSheetViewFlex } from '../ui/BottomSheetViewFlex'
import Button from '../ui/Button'
import { Flex } from '../ui/Flex'
import Spacer from '../ui/Spacer'

const Container = styled(Flex)`
  padding: ${SPACING * 2}px ${SPACING * 2}px;
  min-height: 900px;
`

const TreeContainer = styled(Flex)`
  margin: 0 -${SPACING * 2}px;
`

const LevelExplanationModal = () => {
  const modalProps = useModal({ snapPoints: [`65%`] })
  const { setClosedLevelExplanation } = useOnboarding()

  const onModalClose = useCallback(() => {
    setClosedLevelExplanation(true)
    if (Platform.OS === 'ios') {
      Keyboard.dismiss()
    }
  }, [setClosedLevelExplanation])

  return (
    <BottomSheet
      ref={levelExplanationModalRef}
      index={-1}
      enablePanDownToClose
      onClose={onModalClose}
      {...modalProps}>
      <BottomSheetViewFlex flex={1} justify={'center'} column>
        <Container>
          <Heading4>Level up your habits!</Heading4>
          <TreeContainer row justify={'space-between'} align={'flex-end'}>
            <Flex column align={'center'}>
              <Heading6>Lv. 1</Heading6>
              {levelComponents[0]}
            </Flex>
            <FontAwesome5 name="arrow-right" size={16} color="black" />
            <Flex column align={'center'}>
              <Heading6>Lv. 4</Heading6>
              {levelComponents[3]}
            </Flex>
            <FontAwesome5 name="arrow-right" size={16} color="black" />
            <Flex column align={'center'}>
              <Heading6>Lv. 7</Heading6>
              {levelComponents[6]}
            </Flex>
          </TreeContainer>
          <Spacer x={3} />
          <Body color={COLORS.DARK_GREY}>
            For every habit you train, you will get experience and eventually level up. Every step
            you take towards your goal is a step in the right direction. Try to reach Max Level!
          </Body>
          <Spacer x={4} />
          <Button
            small
            buttonType={'black'}
            onPress={() => levelExplanationModalRef.current?.close()}>
            Understood
          </Button>
        </Container>
      </BottomSheetViewFlex>
    </BottomSheet>
  )
}

export default LevelExplanationModal
