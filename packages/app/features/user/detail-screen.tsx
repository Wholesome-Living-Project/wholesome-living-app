import React from 'react'
import { Text } from 'react-native'
import { createParam } from 'solito'
import { TextLink } from 'solito/link'
import Background from '../../components/Background'

const { useParam } = createParam<{ id: string }>()

export function UserDetailScreen() {
  const [id] = useParam('id')

  return (
    <Background>
      <Text>{`User ID: ${id}`}</Text>
      <TextLink href="/">👈 Go Home</TextLink>
    </Background>
  )
}
