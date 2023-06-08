import axios from 'axios'
import Constants from 'expo-constants'
import React, { createContext, PropsWithChildren, useCallback, useContext, useState } from 'react'
import { api } from '../../api/requests'
import { useUser } from '../hooks/useUser'

type ChatType = {
  sendMessage: (message: string) => Promise<string>
  messages: Message[]
  setMessages: (st: Message[]) => void
  generateSettings: () => void
}

const ChatContext = createContext<ChatType>({} as ChatType)

export const useChat = () => useContext(ChatContext)

export type Message = {
  content: string
  role: 'user' | 'assistant' | 'system'
}

const failsafeJson = {
  enabledPlugins: ['finance', 'meditation'],
  finance: {
    notifications: true,
    amountNotifications: 1,
    investmentGoal: 0,
    investmentTimeGoal: 1,
    strategyAmount: 0,
    strategy: 'Round',
    periodNotifications: 'Day',
  },
  meditation: {
    notifications: true,
    amountNotifications: 1,
    periodNotifications: 'Day',
    meditationTimeGoal: 10,
  },
  elevator: {
    notifications: false,
    amountNotifications: 0,
    goal: 0,
    periodNotifications: 'Day',
  },
}
const useProvideChat = (): ChatType => {
  const { user } = useUser()
  const [extractedJson, setExtractedJson] = useState<any>([])
  const [messages, setMessages] = useState<Message[]>([
    {
      role: 'system',
      content:
        "'As a friendly habit formation consultant, your goal is to help users discover a specific easily performed, and trackable habit. Use fewer than 5 concise questions to gather essential user information.\n" +
        '\n' +
        'This application has several Plugins that help you form habits two of them are: Meditation: to form the habit of meditating, finance to start saving money and invest for the future.\n' +
        '\n' +
        'For each plugin it is possible to activate notifications. Ask the user if and how often the app should remind him to use each one of the plugins meditation and finance.\n' +
        '\n' +
        'If the user chooses to use the finance plugin you need to ask him the following questions:\n' +
        '1 .How much does he want to save\n' +
        '2.What strategy does he want to use for saving, there is 3 options:\n' +
        '\t- round up to the nearest factor of 5 and save the difference \n' +
        '\t- save a percentage of each spending you make\n' +
        '\t- save a fix amount every time you spend money\n' +
        'If the user chooses to use the meditation plugin you need to ask him the following questions:\n' +
        '1. How many times does he want to meditate\n' +
        '\n' +
        ' Guide them through identifying the tiny habit and conditions for nuding and notification. Consider various trackable data for conditions and determine which data the user is willing to share. Summarize and end the conversation by saying you will send a notification when conditions are met. Limit your response to 20 words or less',
    },
    {
      content: "Hi! I'm your Al Coach and I'm here to help you narrow down your goal.",
      role: 'assistant',
    },
  ])

  const resetMessages = useCallback(() => {
    setMessages([
      {
        role: 'system',
        content:
          "'As a friendly habit formation consultant, your goal is to help users discover a specific easily performed, and trackable habit. Use fewer than 5 concise questions to gather essential user information.\n" +
          '\n' +
          'This application has several Plugins that help you form habits three of them are: Meditation: to form the habit of meditating, finance to start saving money and invest for the future. elevator: take the stairs more often \n' +
          '\n' +
          'For each plugin it is possible to activate notifications. Ask the user if and how often the app should remind him to use each one of the plugins meditation and finance.\n' +
          '\n' +
          'If the user chooses to use the finance plugin you need to ask him the following questions:\n' +
          '1 .How much does he want to save\n' +
          '2.What strategy does he want to use for saving, there is 3 options:\n' +
          '\t- round up to the nearest factor of 5 and save the difference \n' +
          '\t- save a percentage of each spending you make\n' +
          '\t- save a fix amount every time you spend money\n' +
          'If the user chooses to use the meditation plugin you need to ask him the following questions:\n' +
          '1. How many times does he want to meditate\n' +
          'If the user chooses to use the elevator plugin you need to ask him the following questions:\n' +
          '1. Do you want to be nugged every time you take an elevator?\n' +
          '\n' +
          ' Guide them through identifying the tiny habit and conditions for nuding and notification. Consider various trackable data for conditions and determine which data the user is willing to share. Summarize and end the conversation by saying you will send a notification when conditions are met. Limit your response to 20 words or less',
      },
      {
        content: "Hi! I'm your Al Coach and I'm here to help you narrow down your goal.",
        role: 'assistant',
      },
    ])
  }, [])

  const sendMessage = useCallback(
    async (message: string) => {
      try {
        const res = await axios.post(
          'https://api.openai.com/v1/chat/completions',
          {
            model: 'gpt-3.5-turbo',
            messages: [
              ...messages,
              {
                content: message,
                role: 'user',
              },
            ],
          },
          {
            headers: {
              'Content-Type': 'application/json',
              Authorization: 'Bearer ' + Constants.manifest?.extra?.CHATGPT_API_KEY,
            },
          }
        )

        setMessages([
          ...messages,
          {
            content: message,
            role: 'user',
          },
          {
            content: res.data.choices[0].message.content,
            role: 'assistant',
          },
        ])
      } catch (e) {
        console.error(e)
      }
      return 'Sorry I did not understand'
    },
    [messages]
  )

  const fillFaultySettings = useCallback((faultyObj: any, failsafeObj: any) => {
    for (const key in failsafeObj) {
      if (typeof failsafeObj[key] === 'object' && failsafeObj[key] !== null) {
        if (!faultyObj[key]) {
          faultyObj[key] = {}
        }
        fillFaultySettings(faultyObj[key], failsafeObj[key])
      } else {
        if (!faultyObj.hasOwnProperty(key)) {
          faultyObj[key] = failsafeObj[key]
        } else if (typeof faultyObj[key] !== typeof failsafeObj[key]) {
          faultyObj[key] = failsafeObj[key]
        }
      }
    }
  }, [])

  const setUserSettings = useCallback(
    async (json: any) => {
      if (!user?.id) {
        return
      }
      console.log('JSON BEFORE SETTING SETTINGS', json)
      try {
        await api.settingsApi.settingsPost(user.id, json)
        resetMessages()
      } catch (e) {
        console.log(e)
        console.log('TRYNG TO FIX JSON')
        try {
          fillFaultySettings(json, failsafeJson)
          console.log('JSON AFTER FIXING', json)
          await api.settingsApi.settingsPost(user?.id, json)
        } catch (e) {
          console.log(e)
        } finally {
          resetMessages()
        }
      } finally {
        resetMessages()
      }
    },
    [fillFaultySettings, resetMessages, user?.id]
  )

  const generateSettings = useCallback(async () => {
    const promt =
      'SettingsCreateSettingsRequest {' +
      "enabledPlugins:{{'elevator'|'finance'|'meditation'}[]}" +
      "elevator:{amountNotifications: number,goal: number, notifications: boolean, periodNotifications: {'Day'|'Month'|'Week'} }" +
      "finance:{amountNotifications: number, investmentGoal: number, investmentTimeGoal: number, notifications: boolean, periodNotifications: {'Day'|'Month'|'Week'},strategy: {'Round','Plus'|'Percent'},strategyAmount: number}" +
      "meditation:{amountNotifications: number, meditationTimeGoal: number, notifications: boolean,periodNotifications: {'Day'|'Month'|'Week'}}" +
      "Fill out the above json with the most probable settings for the user. Respond with JSON only. If you dont know one of the fields respond with a value that has the correct type. In the fields with three options like {'option1'|'option2'|'option3'} one of the three options always has to be chosen" +
      '[no prose] [Output only JSON]'
    try {
      const res = await axios.post(
        'https://api.openai.com/v1/chat/completions',
        {
          model: 'gpt-3.5-turbo',
          messages: [
            ...messages,
            {
              content: promt,
              role: 'user',
            },
          ],
        },
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + Constants.manifest?.extra?.CHATGPT_API_KEY,
          },
        }
      )
      console.log(res.data.choices)
      const json = parseJson(res.data.choices[0].message.content)
      console.log(json)
      if (json) {
        setExtractedJson(json)
        await setUserSettings(json)
      }
    } catch (e) {
      console.log(e)
    }
  }, [messages, setUserSettings])

  return {
    sendMessage,
    messages,
    setMessages,
    generateSettings,
  }
}

const parseJson = (json: string) => {
  // go through the srting and find the first { and the last } and return the string in between
  const first = json.indexOf('{')
  const last = json.lastIndexOf('}')
  if (first === -1 || last === -1) {
    return null
  }
  json = json.substring(first, last + 1)
  console.log(json)
  // remove all the \ from the string
  json = json.replace(/\\/g, '')
  console.log(json)
  try {
    return JSON.parse(json)
  } catch (e) {
    console.log(e)
    return null
  }
}

export const ChatProvider = ({ children }: PropsWithChildren) => {
  const providedChatProps = useProvideChat()
  return (
    <>
      <ChatContext.Provider value={providedChatProps}>{children}</ChatContext.Provider>
    </>
  )
}
