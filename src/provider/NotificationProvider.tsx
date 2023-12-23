import * as Device from 'expo-device'
import { Subscription } from 'expo-modules-core'
import * as Notifications from 'expo-notifications'
import React, {
  createContext,
  PropsWithChildren,
  useContext,
  useEffect,
  useRef,
  useState,
} from 'react'
import { Platform } from 'react-native'

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
  }),
})

type NotificationContextType = {
  expoPushToken: string
}

const NotificationContext = createContext<NotificationContextType>({} as NotificationContextType)

export const useNotifications = () => useContext(NotificationContext)

const useProvideNotifications = (): NotificationContextType => {
  const [expoPushToken, setExpoPushToken] = useState('')
  const [notification, setNotification] = useState<Notifications.Notification>()
  const notificationListener = useRef<Subscription>()
  const responseListener = useRef<Subscription>()

  console.log(notification)

  useEffect(() => {
    registerForPushNotificationsAsync().then((token) => setExpoPushToken(token))

    notificationListener.current = Notifications.addNotificationReceivedListener((notification) => {
      notification && setNotification(notification)
    })

    responseListener.current = Notifications.addNotificationResponseReceivedListener((response) => {
      console.log(response)
    })

    return () => {
      notificationListener.current &&
        Notifications.removeNotificationSubscription(notificationListener.current)
      responseListener.current &&
        Notifications.removeNotificationSubscription(responseListener.current)
    }
  }, [])

  return { expoPushToken }
}

export const NotificationProvider = ({ children }: PropsWithChildren) => {
  const providedNotificationProps = useProvideNotifications()
  return (
    <>
      <NotificationContext.Provider value={providedNotificationProps}>
        {children}
      </NotificationContext.Provider>
    </>
  )
}

// Example on how to schedule a notification directly from the frontend. This is not used in the app and is done in the backend instead.
export async function schedulePushNotification() {
  await Notifications.scheduleNotificationAsync({
    content: {
      title: "You've got mail! 📬",
      body: 'Here is the notification body',
      data: { data: 'goes here' },
    },
    trigger: { seconds: 2 },
  })
}

async function registerForPushNotificationsAsync() {
  let token

  if (Platform.OS === 'android') {
    await Notifications.setNotificationChannelAsync('default', {
      name: 'default',
      importance: Notifications.AndroidImportance.MAX,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: '#FF231F7C',
    })
  }

  if (Device.isDevice) {
    const { status: existingStatus } = await Notifications.getPermissionsAsync()
    let finalStatus = existingStatus
    if (existingStatus !== 'granted') {
      const { status } = await Notifications.requestPermissionsAsync()
      finalStatus = status
    }
    if (finalStatus !== 'granted') {
      alert('Failed to get push token for push notification!')
      return
    }
    // Learn more about projectId:
    // https://docs.expo.dev/push-notifications/push-notifications-setup/#configure-projectid
    token = (
      await Notifications.getExpoPushTokenAsync({
        projectId: '475aab41-a2c2-4c33-8ec9-608097d85ec1',
      })
    ).data
    console.log(token)
  } else {
    alert('Must use physical device for Push Notifications')
  }

  return token
}
