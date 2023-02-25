import Background from 'app/components/Background'
import Form from '../../../../packages/app/components/Form'
import { MaxWidthFlex } from '../components/ui/MaxWidthFlex'

const Home = () => {
  return (
    <Background>
      <MaxWidthFlex column>
        <Form />
      </MaxWidthFlex>
    </Background>
  )
}

export default Home
