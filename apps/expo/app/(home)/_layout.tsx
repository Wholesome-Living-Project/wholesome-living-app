import { Stack } from 'expo-router'

// layout for customizing mobile navigation
export default function Layout() {
  return (
    <Stack initialRouteName={'index'}>
      <Stack.Screen name={'index'} options={{ title: 'Home' }} />
      <Stack.Screen name={'user/[id]'} options={{ title: 'User' }} />
    </Stack>
  )
}
