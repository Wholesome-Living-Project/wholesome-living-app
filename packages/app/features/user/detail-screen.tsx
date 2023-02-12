import { Text } from 'dripsy'
import { createParam } from 'solito'
import { TextLink } from 'solito/link'
import Background from '../../theme/components/Background'

const { useParam } = createParam<{ id: string }>()

export function UserDetailScreen() {
  const [id] = useParam('id')

  return (
    <Background>
      <Text sx={{ textAlign: 'center', mb: 16, fontWeight: 'bold' }}>{`User ID: ${id}`}</Text>
      <TextLink href="/">👈 Go Home</TextLink>
    </Background>
  )
}
