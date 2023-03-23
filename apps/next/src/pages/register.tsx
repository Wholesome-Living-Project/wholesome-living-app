import RegisterForm from 'packages/app/components/RegisterForm'
import { MaxWidthFlex } from '../components/ui/MaxWidthFlex'

const Register = () => {
  return (
    <MaxWidthFlex column>
      <RegisterForm type={'register'} />
    </MaxWidthFlex>
  )
}

export default Register
