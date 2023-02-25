import Button from 'app/components/Button'
import Spacer from 'app/components/Spacer'
import { ComponentWidthWeb } from 'app/components/ui/ComponentWidthWeb'
import { OUTER_BORDER_RADIUS, SPACING, __COLORS } from 'app/theme/theme'
import { Heading3 } from 'app/theme/typography'
import { createUserWithEmailAndPassword } from 'firebase/auth'
import React, { useCallback, useState } from 'react'
import styled from 'styled-components/native'
import { auth } from '../lib/firebase'

const Input = styled.TextInput`
  border: 1px solid ${__COLORS.PRIMARY};
  border-radius: ${OUTER_BORDER_RADIUS}px;
  padding: ${SPACING}px ${SPACING * 2}px;
  min-width: 200px;
`

const Wrapper = styled(ComponentWidthWeb)`
  border: 1px solid ${__COLORS.PRIMARY};
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

  const createUser = useCallback((email: string, password: string) => {
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user
        console.log(user.email)
      })
      .catch((err) => {
        console.log(err)
      })
  }, [])

  return (
    <Wrapper maxWidth={300}>
      <Heading3 color={__COLORS.PRIMARY}>{type === 'register' ? 'Register' : 'Login'}</Heading3>
      <Spacer x={4} />
      <Input placeholder={'email'} onChangeText={(text) => setEmail(text)} />
      <Spacer x={2} />
      <Input placeholder={'password'} secureTextEntry onChangeText={(text) => setPassword(text)} />
      <Spacer x={4} />
      <Button
        link={'/user/primary'}
        buttonType={'cta'}
        onPress={type === 'register' ? () => createUser(email, password) : () => undefined}>
        Submit
      </Button>
    </Wrapper>
  )
}

export default Form
