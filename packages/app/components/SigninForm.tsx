import { signIn } from 'app/auth/auth'
import Button from 'app/components/ui/Button'
import { ComponentWidthWeb } from 'app/components/ui/ComponentWidthWeb'
import Spacer from 'app/components/ui/Spacer'
import { COLORS, OUTER_BORDER_RADIUS, SPACING } from 'app/theme/theme'
import { Heading3 } from 'app/theme/typography'
import React, { useCallback, useState } from 'react'
import styled from 'styled-components/native'

const Input = styled.TextInput`
  border: 1px solid ${COLORS.PRIMARY};
  border-radius: ${OUTER_BORDER_RADIUS}px;
  padding: ${SPACING}px ${SPACING * 2}px;
  min-width: 200px;
`

const Wrapper = styled(ComponentWidthWeb)`
  padding: 30px;
  border-radius: ${OUTER_BORDER_RADIUS}px;
  background-color: red;
`

const SigninForm = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const submit = useCallback(async () => {
    try {
      await signIn(email, password)
    } catch (err) {
      console.log(err)
    }
  }, [email, password])

  return (
    <Wrapper maxWidth={300}>
      <Heading3 color={COLORS.PRIMARY}>Login</Heading3>
      <Spacer x={4} />
      <Input placeholder={'email'} onChangeText={(text) => setEmail(text)} />
      <Spacer x={2} />
      <Input placeholder={'password'} secureTextEntry onChangeText={(text) => setPassword(text)} />
      <Spacer x={4} />
      <Button onPress={() => submit()}>Submit</Button>
    </Wrapper>
  )
}

export default SigninForm
