import { signOut } from 'app/auth/auth'
import { Row } from 'app/components/ui/Row'
import { useAuth } from 'app/hooks/useAuth'
import { Heading6 } from 'app/theme/typography'
import React from 'react'
import { useNavigation } from 'solito/build/router/use-navigation'
import Background from '../../components/Background'
import Button from '../../components/Button'

export function HomeScreen() {
  const user = useAuth()
  const navigation = useNavigation()
  return (
    <Background>
      <Heading6>{`You are logged in with email ${user?.email}`}</Heading6>
      <Row>
        <Button
          onPress={async () => {
            await signOut().catch((err) => console.log(err))
          }}>
          Logout
        </Button>
      </Row>
    </Background>
  )
}
