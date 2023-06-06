import React, { useCallback, useEffect, useState } from 'react'
import { Keyboard, Platform, View } from 'react-native'
import { useNextRouter } from 'solito/build/router/use-next-router'
import styled from 'styled-components/native'
import { useAuthentication } from '../../provider/AuthenticationProvider'
import { COLORS, OUTER_BORDER_RADIUS } from '../../theme/theme'
import { Heading3 } from '../../theme/typography'
import Button from '../ui/Button'
import { ComponentWidthWeb } from '../ui/ComponentWidthWeb'
import Input from '../ui/Input'
import Spacer from '../ui/Spacer'
import { validateEmail, validateName, validatePassword } from '../../helpers/validateFields'

const Wrapper = styled(ComponentWidthWeb)`
  padding: 10px 30px;
  border-radius: ${OUTER_BORDER_RADIUS}px;
  flex: 1;
`

// maybe not needed anymore
const NameWrapper = styled(View)`
  display: flex;
  flex-direction: row;
  flex: 1;
`


type ValidationErrors = {
  firstName?: string
  lastName?: string
  password?: string
  email?: string
}

const SignupForm = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [dateOfBirth, setDateOfBirth] = useState('01.02.1993')
  const router = useNextRouter()
  const { createUserWithEmailAndPassword } = useAuthentication()

  const [buttonDisabled, setButtonDisabled] = useState(false)
  const [errors, setErrors] = useState<ValidationErrors>({})

  useEffect(() => {
    setButtonDisabled(isOneEmpty)
  }, [email, password, firstName, lastName])

  const isOneEmpty = () =>
    !(Boolean(email) && Boolean(password) && Boolean(firstName) && Boolean(lastName))

  const submit = useCallback(async () => {
    if (!validateAll()){
      return
    }

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
  }, [createUserWithEmailAndPassword, dateOfBirth, email, firstName, lastName, password, router])

  const validateAll = useCallback(() => {
    const err: ValidationErrors = {}

    if (!validateEmail(email)) {
      err.email = 'Please enter a valid email address.'
    }

    if (!validateName(firstName)) {
      err.firstName = 'Please enter a valid first name.'
    }

    if (!validateName(lastName)) {
      err.lastName = 'Please enter a valid last name.'
    }

    if (!validatePassword(password)) {
      err.password = 'Please enter a valid password (min. 8 letters).'
    }

    setErrors(err)
    return !Boolean(err.firstName || err.lastName || err.email || err.password)
  }, [email, firstName, lastName, password, errors])

  return (
    <Wrapper maxWidthWeb={300}>
      <Heading3 color={COLORS.PRIMARY}>Register</Heading3>
      <Spacer x={4} />
      <Input
        placeholder={'First Name'}
        value={firstName}
        onChangeText={(text) => setFirstName(text)}
        errorMsg={errors.firstName}
      />
      <Spacer x={1} />
      <Input
        placeholder={'Last Name'}
        value={lastName}
        onChangeText={(text) => setLastName(text)}
        errorMsg={errors.lastName}
      />
      <Spacer x={3} />
      <Input
        placeholder={'Email'}
        value={email}
        onChangeText={(text) => setEmail(text)}
        errorMsg={errors.email}
      />
      <Spacer x={1} />
      <Input
        placeholder={'Password'}
        value={password}
        secureTextEntry
        onChangeText={(text) => setPassword(text)}
        errorMsg={errors.password}
      />
      <Spacer x={4} />
      <Button buttonType={'primary'} disabled={buttonDisabled} onPress={() => submit()}>
        Submit
      </Button>
      <Spacer x={2} />
    </Wrapper>
  )
}

export default SignupForm
