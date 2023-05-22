import { signInModalRef } from 'app/components/refs/modal-refs'
import Button from 'app/components/ui/Button'
import { ComponentWidthWeb } from 'app/components/ui/ComponentWidthWeb'
import Input from 'app/components/ui/Input'
import Spacer from 'app/components/ui/Spacer'
import { useAuthentication } from 'app/provider/AuthenticationProvider'
import { COLORS, OUTER_BORDER_RADIUS } from 'app/theme/theme'
import { Heading3 } from 'app/theme/typography'
import React, { useCallback, useState } from 'react'
import { Keyboard } from 'react-native'
import styled from 'styled-components/native'

const Wrapper = styled(ComponentWidthWeb)`
  padding: 10px 30px;
  border-radius: ${OUTER_BORDER_RADIUS}px;
`

const SigninForm = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const { signInWithEmailAndPassword } = useAuthentication()

  const submit = useCallback(async () => {
    try {
      await signInWithEmailAndPassword({ email, password })

      Keyboard.dismiss()
      signInModalRef.current?.close()
    } catch (err) {
      console.log(err)
    }
  }, [email, password, signInModalRef, signInWithEmailAndPassword])

  return (
    <Wrapper maxWidthWeb={300}>
      <Heading3 color={COLORS.PRIMARY}>Login</Heading3>
      <Spacer x={2} />
      <Input placeholder={'Email'} value={email} onChangeText={(text) => setEmail(text)} />
      <Spacer x={2} />
      <Input
        placeholder={'Password'}
        value={password}
        secureTextEntry
        onChangeText={(text) => setPassword(text)}
      />
      <Spacer x={4} />
      <Button fullWidth onPress={() => submit()} small>
        Submit
      </Button>
      <Spacer x={20} />
    </Wrapper>
  )
}

export default SigninForm
