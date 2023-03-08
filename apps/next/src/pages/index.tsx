import { useAuth } from 'app/hooks/useAuth'
import Form from '../../../../packages/app/components/Form'
import { MaxWidthFlex } from '../components/ui/MaxWidthFlex'

const Home = () => {
  const user = useAuth()

  if (!user)
    return (
      <MaxWidthFlex column>
        <Form type={'login'} />
      </MaxWidthFlex>
    )

  return <MaxWidthFlex>You are logged in with {user?.email}</MaxWidthFlex>
}

export default Home
