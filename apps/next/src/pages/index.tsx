import { useAuth } from 'app/hooks/useAuth'
import { MaxWidthFlex } from '../components/ui/MaxWidthFlex'

const Home = () => {
  const user = useAuth()

  if (!user) return <MaxWidthFlex column>{/*<SignupForm />*/}</MaxWidthFlex>

  return <MaxWidthFlex>You are logged in with {user?.email}</MaxWidthFlex>
}

export default Home
