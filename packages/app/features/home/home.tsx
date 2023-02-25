import Form, { FormType } from 'app/components/Form'
import { Row } from 'app/components/ui/Row'
import React, { useState } from 'react'
import Background from '../../components/Background'
import Button from '../../components/Button'
import Spacer from '../../components/Spacer'

export function HomeScreen() {
  const [formType, setFormType] = useState<FormType>('login')
  return (
    <Background>
      <Form type={formType} />
      <Spacer x={6} />
      <Row>
        <Button
          onPress={() => {
            setFormType('login')
          }}>
          Login
        </Button>
        <Spacer x={2} />
        <Button
          onPress={() => {
            setFormType('register')
          }}
          buttonType={'secondary'}>
          Register
        </Button>
      </Row>
    </Background>
  )
}
