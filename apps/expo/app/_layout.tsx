import { Ionicons } from '@expo/vector-icons'
import { Provider } from 'app/provider'
import { Tabs } from 'expo-router'
import { StatusBar } from 'expo-status-bar'

export default function Layout() {
  return (
    <Provider>
      <Tabs initialRouteName={'(home)'} screenOptions={{ headerShown: false }}>
        <Tabs.Screen
          name={'(home)'}
          options={{
            title: 'Home',
            tabBarIcon({ color, size, focused }) {
              return <Ionicons name={focused ? 'home' : 'home-outline'} size={size} color={color} />
            },
          }}
        />
        <Tabs.Screen
          name={'settings'}
          options={{
            title: 'Home',
            tabBarIcon({ color, size, focused }) {
              return (
                <Ionicons
                  name={focused ? 'settings' : 'settings-outline'}
                  size={size}
                  color={color}
                />
              )
            },
          }}
        />
      </Tabs>
      <StatusBar style="auto" />
    </Provider>
  )
}
