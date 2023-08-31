import BottomSheet from 'axelra-react-native-bottom-sheet'
import React, { useCallback } from 'react'
import { Keyboard, Platform } from 'react-native'
import styled from 'styled-components'
import useDataResetter from '../../hooks/useDataResetter'
import { useModal } from '../../hooks/useModal'
import { useAuthentication } from '../../provider/AuthenticationProvider'
import { useOnboarding } from '../../provider/OnboardingProvider'
import { COLORS, SPACING } from '../../theme/theme'
import { Body, Heading4 } from '../../theme/typography'
import { deleteAccountModalRef } from '../refs/modal-refs'
import { BottomSheetViewFlex } from '../ui/BottomSheetViewFlex'
import Button from '../ui/Button'
import { Flex } from '../ui/Flex'
import Spacer from '../ui/Spacer'

const Container = styled(Flex)`
  padding: ${SPACING * 2}px ${SPACING * 3}px;
  min-height: 900px;
`

const DeleteAccountModal = () => {
  const modalProps = useModal({ snapPoints: [`50%`] })
  const { setClosedLevelExplanation } = useOnboarding()
  const { deleteAccount } = useAuthentication()
  const { resetAppData } = useDataResetter()

  const onModalClose = useCallback(() => {
    setClosedLevelExplanation(true)
    if (Platform.OS === 'ios') {
      Keyboard.dismiss()
    }
  }, [setClosedLevelExplanation])

  const deleteUserAccount = useCallback(async () => {
    await deleteAccount()
    resetAppData()
    deleteAccountModalRef.current?.close()
  }, [deleteAccount, resetAppData])

  return (
    <BottomSheet
      ref={deleteAccountModalRef}
      index={-1}
      enablePanDownToClose
      onClose={onModalClose}
      {...modalProps}>
      <BottomSheetViewFlex flex={1} justify={'center'} column>
        <Container column>
          <Heading4>Do you really want to delete your account?</Heading4>
          <Spacer x={1} />
          <Body>
            I hereby confirm that I want to delete my account and all the data connected with it.
          </Body>
          <Spacer x={4} />
          <Button small buttonType={'black'} buttonColor={COLORS.RED} onPress={deleteUserAccount}>
            Delete Account
          </Button>
          <Spacer x={2} />

          <Button small buttonType={'black'} onPress={() => deleteAccountModalRef.current?.close()}>
            Cancel
          </Button>
        </Container>
      </BottomSheetViewFlex>
    </BottomSheet>
  )
}

export default DeleteAccountModal
