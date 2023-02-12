import { Stack } from 'expo-router'

// layout for customizing mobile navigation
export default function Root() {
  return (
    <Stack initialRouteName={'index'}>
      <Stack.Screen name={'index'} options={{ title: 'Settings' }} />
    </Stack>
  )
}
