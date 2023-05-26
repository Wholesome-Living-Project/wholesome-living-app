import { useState } from 'react'
import styled from 'styled-components'

const FormContainer = styled.form`
  max-width: 400px;
  margin: 0 auto;
`

const FormGroup = styled.div`
  margin-bottom: 20px;
`

const Label = styled.label`
  display: block;
  margin-bottom: 5px;
`

const Input = styled.input`
  width: 100%;
  padding: 10px;
  font-size: 16px;
  border-radius: 5px;
  border: 1px solid #ccc;
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
  gap: 10px;
`

const FirstNameInput = styled(Input)`
  flex: 1;
`

const LastNameInput = styled(Input)`
  flex: 1;
`

const Register = () => {
  const [formData, setFormData] = useState({
    email: '',
    firstName: '',
    lastName: '',
    dateOfBirth: '',
  })

  const handleChange = (event) => {
    const { name, value } = event.target
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }))
  }

  const handleSubmit = (event) => {
    event.preventDefault()
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

  return (
    <FormContainer onSubmit={handleSubmit}>
      <FlexContainer>
        <FormGroup>
          <Label htmlFor="firstName">First Name</Label>
          <FirstNameInput
            type="text"
            id="firstName"
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
          />
        </FormGroup>

        <FormGroup>
          <Label htmlFor="lastName">Last Name</Label>
          <LastNameInput
            type="text"
            id="lastName"
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
          />
        </FormGroup>
      </FlexContainer>
      <FormGroup>
        <Label htmlFor="email">Email</Label>
        <Input
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
        />
      </FormGroup>
      <FormGroup>
        <Label htmlFor="dateOfBirth">Date of Birth</Label>
        <Input
          type="text"
          id="dateOfBirth"
          name="dateOfBirth"
          value={formData.dateOfBirth}
          onChange={handleChange}
        />
      </FormGroup>

      <Button type="submit">Register</Button>
    </FormContainer>
  )
}

export default Register
