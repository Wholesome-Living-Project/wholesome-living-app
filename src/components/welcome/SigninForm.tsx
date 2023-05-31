import React, { useCallback, useState } from 'react'
import { Keyboard, View } from 'react-native'
import styled from 'styled-components/native'
import { useAuthentication } from '../../provider/AuthenticationProvider'
import { COLORS } from '../../theme/theme'
import { Heading4 } from '../../theme/typography'
import { signInModalRef } from '../refs/modal-refs'
import Button from '../ui/Button'
import Input from '../ui/Input'
import Spacer from '../ui/Spacer'

const Wrapper = styled(View)`
  padding: 10px 30px;
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
  }, [email, password, signInWithEmailAndPassword])

  return (
    <Wrapper>
      <Heading4 color={COLORS.BLACK}>Login</Heading4>
      <Spacer x={3} />
      <Input placeholder={'Email'} value={email} onChangeText={(text) => setEmail(text)} />
      <Spacer x={2} />
      <Input
        placeholder={'Password'}
        value={password}
        secureTextEntry
        onChangeText={(text) => setPassword(text)}
      />
      <Spacer x={4} />
      <Button fullWidth onPress={() => submit()}>
        Submit
      </Button>
      <Spacer x={2} />
    </Wrapper>
  )
}

export default SigninForm
