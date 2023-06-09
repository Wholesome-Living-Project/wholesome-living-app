import { FontAwesome5 } from '@expo/vector-icons'
import BottomSheet from 'axelra-react-native-bottom-sheet'
import React, { useCallback } from 'react'
import { Image, Keyboard, Platform } from 'react-native'
import styled from 'styled-components'
import { useModal } from '../../hooks/useModal'
import { coachProfiles } from '../../provider/OnboardingProvider'
import { COLORS, SPACING } from '../../theme/theme'
import { Body, Heading4, Regular } from '../../theme/typography'
import { coachExplanationModalRef } from '../refs/modal-refs'
import { BottomSheetViewFlex } from '../ui/BottomSheetViewFlex'
import Button from '../ui/Button'
import { Flex } from '../ui/Flex'
import Spacer from '../ui/Spacer'

const Container = styled(Flex)`
  padding: ${SPACING * 2}px ${SPACING * 3}px;
  min-height: 900px;
`

const ProfileContainer = styled(Flex)`
  width: 100%;
  padding: ${SPACING * 2}px ${SPACING * 5}px;
`

const CoachProfile = styled(Image)`
  width: 100px;
  height: 100px;
`

const CoachExplanationModal = () => {
  const modalProps = useModal({ snapPoints: [`65%`] })

  const onModalClose = useCallback(() => {
    if (Platform.OS === 'ios') {
      Keyboard.dismiss()
    }
  }, [])

  return (
    <BottomSheet
      ref={coachExplanationModalRef}
      index={-1}
      enablePanDownToClose
      onClose={onModalClose}
      {...modalProps}>
      <BottomSheetViewFlex flex={1} justify={'center'} column>
        <Container>
          <Heading4>Choose a coach</Heading4>
          <Body color={COLORS.DARK_GREY}>
            You can choose a coach to guide you through the onboarding process. This choice will not
            impact your experience with the app, it is only cosmetic.
          </Body>
          <Spacer x={2} />
          <Flex row justify={'space-between'} align={'flex-end'}>
            <ProfileContainer row justify={'space-between'} align={'center'}>
              <Flex column align={'center'}>
                <CoachProfile source={coachProfiles[0]} />
                <Spacer x={0.5} />
                <Body>Gabriel</Body>
              </Flex>
              <Flex column align={'center'}>
                <Regular>swipe</Regular>
                <FontAwesome5 name={'arrows-alt-h'} size={30}></FontAwesome5>
              </Flex>
              <Flex column align={'center'}>
                <CoachProfile source={coachProfiles[1]} />
                <Spacer x={0.5} />
                <Body>Aurora</Body>
              </Flex>
            </ProfileContainer>
          </Flex>
          <Spacer x={4} />
          <Button
            small
            buttonType={'black'}
            onPress={() => coachExplanationModalRef.current?.close()}>
            Understood
          </Button>
        </Container>
      </BottomSheetViewFlex>
    </BottomSheet>
  )
}

export default CoachExplanationModal
