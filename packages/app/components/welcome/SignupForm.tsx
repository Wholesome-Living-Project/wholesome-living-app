import Button from 'app/components/ui/Button'
import { ComponentWidthWeb } from 'app/components/ui/ComponentWidthWeb'
import Input from 'app/components/ui/Input'
import Spacer from 'app/components/ui/Spacer'
import { useAuthentication } from 'app/provider/AuthenticationProvider'
import { COLORS, OUTER_BORDER_RADIUS } from 'app/theme/theme'
import { Heading3 } from 'app/theme/typography'
import React, { useCallback, useState } from 'react'
import { Keyboard, Platform, View } from 'react-native'
import { useNextRouter } from 'solito/build/router/use-next-router'
import styled from 'styled-components/native'

const Wrapper = styled(ComponentWidthWeb)`
  padding: 10px 30px;
  border-radius: ${OUTER_BORDER_RADIUS}px;
  flex: 1;
`

const NameWrapper = styled(View)`
  display: flex;
  flex-direction: row;
  flex: 1;
`

const SignupForm = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [dateOfBirth, setDateOfBirth] = useState('01.02.1993')
  const router = useNextRouter()
  const { createUserWithEmailAndPassword } = useAuthentication()

  const submit = useCallback(async () => {
    try {
      await createUserWithEmailAndPassword({
        email,
        password,
        dateOfBirth,
        firstName,
        lastName,
      }).then(() => Platform.OS === 'web' && router?.push('/'))
      Keyboard.dismiss()
    } catch (err) {
      console.log(err)
    }
  }, [email, firstName, password, router])

  return (
    <Wrapper maxWidthWeb={300}>
      <Heading3 color={COLORS.PRIMARY}>Register</Heading3>
      <Spacer x={4} />
      <NameWrapper>
        <Input
          placeholder={'First Name'}
          value={firstName}
          onChangeText={(text) => setFirstName(text)}
        />
        <Spacer x={2} />
        <Input
          placeholder={'Last Name'}
          value={lastName}
          onChangeText={(text) => setLastName(text)}
        />
      </NameWrapper>
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
      <Button buttonType={'primary'} onPress={() => submit()}>
        Submit
      </Button>
      <Spacer x={20} />
    </Wrapper>
  )
}

export default SignupForm
