import React, { useState } from 'react'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import styled from 'styled-components'

interface FormData {
  email: string
  firstName: string
  lastName: string
  dateOfBirth: number | null
}

const Container = styled.div`
  max-width: 400px;
  margin: 2em auto;
  background-color: #fff;
  padding: 2em;
  border-radius: 12px;
  box-shadow: 0px 4px 16px rgba(0, 0, 0, 0.1);
`

const FormContainer = styled.form`
  margin-bottom: 2em;
`

const FormGroup = styled.div`
  margin-bottom: 1.5em;
`

const Label = styled.label`
  display: block;
  margin-bottom: 0.5em;
  font-weight: 600;
`

interface InputProps {
  invalid?: boolean
}

const Input = styled.input<InputProps>`
  width: 100%;
  padding: 10px;
  font-size: 16px;
  border-radius: 8px;
  border: 1px solid ${(props) => (props.invalid ? 'red' : '#ccc')};
  transition: border-color 0.3s ease-in-out;

  &:focus {
    outline: none;
    border-color: #0088cc;
  }
`

const Button = styled.button`
  padding: 10px 20px;
  font-size: 16px;
  background-color: #0088cc;
  color: #fff;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s ease-in-out;

  &:hover {
    background-color: #006699;
  }
`

const FlexContainer = styled.div`
  display: flex;
  gap: 1em;
`

const FirstNameInput = styled(Input)`
  flex: 1;
`

const LastNameInput = styled(Input)`
  flex: 1;
`

const DatePickerInput = styled(Input)`
  cursor: pointer;
`

const ToggleContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  margin-bottom: 1em;
`

const SwitchContainer = styled.label`
  position: relative;
  display: inline-block;
  width: 60px;
  height: 34px;
`

const SwitchSlider = styled.div<{ isOn: boolean }>`
  position: absolute;
  cursor: pointer;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: ${(props) => (props.isOn ? '#0088cc' : '#ccc')};
  border-radius: 34px;
  transition: background-color 0.3s ease-in-out;

  &:before {
    position: absolute;
    content: '';
    height: 26px;
    width: 26px;
    bottom: 4px;
    background-color: white;
    transition: all 0.3s ease-in-out;
    border-radius: 50%;
    left: ${(props) => (props.isOn ? 'calc(100% - 4px)' : '4px')};
    transform: ${(props) => (props.isOn ? 'translateX(-100%)' : 'none')};
  }
`

const InputCheckbox = styled.input`
  opacity: 0;
  width: 0;
  height: 0;
`

const Login: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    email: '',
    firstName: '',
    lastName: '',
    dateOfBirth: null,
  })

  const [validationErrors, setValidationErrors] = useState<Partial<FormData>>({})
  const [isRegisterMode, setIsRegisterMode] = useState<boolean>(true)

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }))
  }

  const handleDateChange = (date: Date | null) => {
    const unixTimestamp = date ? Math.floor(date.getTime() / 1000) : null
    setFormData((prevFormData) => ({
      ...prevFormData,
      dateOfBirth: unixTimestamp,
    }))
  }

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    // Validation checks
    const errors: Partial<FormData> = {}

    if (!validateEmail(formData.email)) {
      errors.email = 'Please enter a valid email address.'
    }

    if (!validateName(formData.firstName)) {
      errors.firstName = 'Please enter a valid first name.'
    }

    if (!validateName(formData.lastName)) {
      errors.lastName = 'Please enter a valid last name.'
    }

    if (Object.keys(errors).length > 0) {
      setValidationErrors(errors)
      return
    }

    setValidationErrors({})

    // Make the API call to submit the data
    fetch('your-backend-url', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    })
      .then((response) => response.json())
      .then((data) => {
        // Handle the response from the backend
        console.log(data)
      })
      .catch((error) => {
        // Handle any errors
        console.error(error)
      })
  }

  const validateEmail = (email: string) => {
    // Basic email validation check
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return regex.test(email)
  }

  const validateName = (name: string) => {
    // Name validation check (only allowing letters, spaces, and hyphens)
    const regex = /^[A-Za-z\s-]+$/
    return regex.test(name)
  }

  const toggleFormMode = () => {
    setIsRegisterMode((prevMode) => !prevMode)
  }

  return (
    <Container>
      <ToggleContainer>
        <SwitchContainer>
          <InputCheckbox type="checkbox" onChange={toggleFormMode} />
          <SwitchSlider isOn={isRegisterMode} />
        </SwitchContainer>
      </ToggleContainer>
      <FormContainer onSubmit={handleSubmit}>
        <h2>{isRegisterMode ? 'Register' : 'Login'}</h2>
        <br />
        {isRegisterMode && (
          <FlexContainer>
            <FormGroup>
              <Label htmlFor="firstName">First Name</Label>
              <FirstNameInput
                type="text"
                id="firstName"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                invalid={!!validationErrors.firstName}
              />
              {validationErrors.firstName && <p>{validationErrors.firstName}</p>}
            </FormGroup>

            <FormGroup>
              <Label htmlFor="lastName">Last Name</Label>
              <LastNameInput
                type="text"
                id="lastName"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                invalid={!!validationErrors.lastName}
              />
              {validationErrors.lastName && <p>{validationErrors.lastName}</p>}
            </FormGroup>
          </FlexContainer>
        )}

        <FormGroup>
          <Label htmlFor="email">Email</Label>
          <Input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            invalid={!!validationErrors.email}
          />
          {validationErrors.email && <p>{validationErrors.email}</p>}
        </FormGroup>

        {isRegisterMode && (
          <FormGroup>
            <Label htmlFor="dateOfBirth">Date of Birth</Label>
            <DatePicker
              selected={formData.dateOfBirth ? new Date(formData.dateOfBirth * 1000) : null}
              onChange={handleDateChange}
              customInput={<DatePickerInput />}
              showYearDropdown
              dropdownMode="select"
              maxDate={new Date()}
            />
          </FormGroup>
        )}

        <FormGroup>
          <Label htmlFor="password">Password</Label>
          <Input type="password" id="password" name="password" />
        </FormGroup>

        <Button type="submit">{isRegisterMode ? 'Register' : 'Login'}</Button>
      </FormContainer>
    </Container>
  )
}

export default Login
