import { signUp } from 'app/auth/auth'
import Button from 'app/components/ui/Button'
import { ComponentWidthWeb } from 'app/components/ui/ComponentWidthWeb'
import Spacer from 'app/components/ui/Spacer'
import { COLORS, OUTER_BORDER_RADIUS, SPACING } from 'app/theme/theme'
import { Heading3 } from 'app/theme/typography'
import React, { useCallback, useState } from 'react'
import { Platform } from 'react-native'
import { useNextRouter } from 'solito/build/router/use-next-router'
import styled from 'styled-components/native'
import { api } from '../../api/requests'

const Input = styled.TextInput`
  border: 1px solid ${COLORS.PRIMARY};
  border-radius: ${OUTER_BORDER_RADIUS}px;
  padding: ${SPACING}px ${SPACING * 2}px;
  min-width: 200px;
`

const Wrapper = styled(ComponentWidthWeb)`
  padding: 30px;
  border-radius: ${OUTER_BORDER_RADIUS}px;
`

const SignupForm = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [firstName, setFirstName] = useState('')
  const router = useNextRouter()

  const submit = useCallback(async () => {
    try {
      // TODO use the token for security
      const firebaseUser = await signUp(email, password)

      if (!firebaseUser) throw new Error('firebase user could not be created')
      const user = await api.userApi
        .userPost({
          email,
          id: firebaseUser.user.uid,
        })
        .then(() => Platform.OS === 'web' && router?.push('/'))
      console.log('user: ', user)
    } catch (err) {
      console.log(err)
    }
  }, [email, firstName, password, router])

  return (
    <Wrapper maxWidth={300}>
      <Heading3 color={COLORS.PRIMARY}>Register</Heading3>
      <Spacer x={4} />
      <Input
        placeholder={'first name'}
        value={firstName}
        onChangeText={(text) => setFirstName(text)}
      />
      <Spacer x={2} />
      <Input placeholder={'email'} value={email} onChangeText={(text) => setEmail(text)} />
      <Spacer x={2} />
      <Input
        placeholder={'password'}
        value={password}
        secureTextEntry
        onChangeText={(text) => setPassword(text)}
      />
      <Spacer x={4} />
      <Button buttonType={'primary'} onPress={() => submit()}>
        Submit
      </Button>
    </Wrapper>
  )
}

export default SignupForm
