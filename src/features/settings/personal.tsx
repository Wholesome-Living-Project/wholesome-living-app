import React from 'react'
import styled from 'styled-components'
import DeleteAccountModal from '../../components/modals/DeleteAccountModal'
import { deleteAccountModalRef } from '../../components/refs/modal-refs'
import Background from '../../components/ui/Background'
import Button from '../../components/ui/Button'
import { Flex } from '../../components/ui/Flex'
import Spacer from '../../components/ui/Spacer'
import UserBanner from '../../components/ui/UserBanner'
import { COLORS } from '../../theme/theme'
import { Body, Heading4, Heading5 } from '../../theme/typography'

const Wrapper = styled(Flex)`
  width: 100%;
`

const PersonalSettings = () => {
  return (
    <Background>
      <Heading4>Account</Heading4>
      <UserBanner />
      <Spacer x={20} />
      <Flex flex={1} column />
      <Wrapper column align={'center'} flex={1}>
        <Heading5>Danger Zone</Heading5>
        <Body>By Deleting your account, you also delete all the data connected with it.</Body>
        <Spacer x={2} />
        <Button
          onPress={() => deleteAccountModalRef.current?.expand()}
          small
          buttonColor={COLORS.RED}>
          Delete Account
        </Button>
      </Wrapper>
      <DeleteAccountModal />
    </Background>
  )
}

export default PersonalSettings
