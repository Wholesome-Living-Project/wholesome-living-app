import React, { useCallback, useEffect, useState } from 'react'
import { Alert, Keyboard, View } from 'react-native'
import styled from 'styled-components/native'
import { validateEmail, validatePassword } from '../../helpers/validateFields'
import { useAuthentication } from '../../provider/AuthenticationProvider'
import { COLORS } from '../../theme/theme'
import { Heading3 } from '../../theme/typography'
import { signInModalRef } from '../refs/modal-refs'
import Button from '../ui/Button'
import Input from '../ui/Input'
import Spacer from '../ui/Spacer'

const Wrapper = styled(View)`
  padding: 10px 30px;
`
type ValidationErrors = {
  email?: string
  password?: string
}

const SigninForm = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const { signInWithEmailAndPassword } = useAuthentication()

  const [buttonDisabled, setButtonDisabled] = useState(false)
  const [errors, setErrors] = useState<ValidationErrors>({})

  useEffect(() => {
    setButtonDisabled(!(Boolean(email) && Boolean(password)))
  }, [email, password])

  const validateAll = useCallback(() => {
    const err: ValidationErrors = {}

    if (!validateEmail(email)) {
      err.email = 'Please enter a valid email address.'
    }

    if (!validatePassword(password)) {
      err.password = 'Please enter a valid password (min. 8 letters).'
    }

    setErrors(err)
    return !Boolean(err.email || err.password)
  }, [email, password])

  const submit = useCallback(async () => {
    if (!validateAll()) {
      return
    }

    try {
      let user = await signInWithEmailAndPassword({ email, password })

      Keyboard.dismiss()

      if (!user) {
        Alert.alert("SignIn", "Email or password is incorrect")
        return
      }
      signInModalRef.current?.close()
    } catch (err) {
      console.log(err)
    }
  }, [email, password, signInWithEmailAndPassword, validateAll])

  return (
    <Wrapper>
      <Heading3 color={COLORS.PRIMARY}>Login</Heading3>
      <Spacer x={3} />
      <Input
        placeholder={'Email'}
        value={email}
        onChangeText={(text) => {
          setEmail(text)
          if (validateEmail(text))
            setErrors((st: ValidationErrors) => {
              return { ...st, email: undefined }
            })
        }}
        errorMsg={errors.email}
      />
      <Spacer x={2} />
      <Input
        placeholder={'Password'}
        value={password}
        secureTextEntry
        onChangeText={(text) => {
          setPassword(text)
          if (validatePassword(text))
            setErrors((st: ValidationErrors) => {
              return { ...st, password: undefined }
            })
        }}
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

export default SigninForm
