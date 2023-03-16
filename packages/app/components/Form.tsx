import { signIn, signUp } from 'app/auth/auth'
import Button from 'app/components/ui/Button'
import { ComponentWidthWeb } from 'app/components/ui/ComponentWidthWeb'
import Spacer from 'app/components/ui/Spacer'
import { COLORS, OUTER_BORDER_RADIUS, SPACING } from 'app/theme/theme'
import { Heading3 } from 'app/theme/typography'
import React, { useState } from 'react'
import { Platform } from 'react-native'
import { useNextRouter } from 'solito/build/router/use-next-router'
import styled from 'styled-components/native'

const Input = styled.TextInput`
  border: 1px solid ${COLORS.PRIMARY};
  border-radius: ${OUTER_BORDER_RADIUS}px;
  padding: ${SPACING}px ${SPACING * 2}px;
  min-width: 200px;
`

const Wrapper = styled(ComponentWidthWeb)`
  border: 1px solid ${COLORS.PRIMARY};
  padding: 30px;
  border-radius: ${OUTER_BORDER_RADIUS}px;
`

export type FormType = 'register' | 'login'

type Props = {
  type?: FormType
}

const Form = ({ type = 'login' }: Props) => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const router = useNextRouter()

  return (
    <Wrapper maxWidth={300}>
      <Heading3 color={COLORS.PRIMARY}>{type === 'register' ? 'Register' : 'Login'}</Heading3>
      <Spacer x={4} />
      <Input placeholder={'email'} onChangeText={(text) => setEmail(text)} />
      <Spacer x={2} />
      <Input placeholder={'password'} secureTextEntry onChangeText={(text) => setPassword(text)} />
      <Spacer x={4} />
      <Button
        buttonType={'cta'}
        onPress={
          type === 'register'
            ? () => {
                signUp(email, password).then(
                  (r) => Platform.OS === 'web' && router?.push('/').catch((err) => console.log(err))
                )
              }
            : () => signIn(email, password)
        }>
        Submit
      </Button>
    </Wrapper>
  )
}

export default Form
