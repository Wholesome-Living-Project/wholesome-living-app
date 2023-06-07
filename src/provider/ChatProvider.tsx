import axios from 'axios'
import Constants from 'expo-constants'
import React, { createContext, PropsWithChildren, useCallback, useContext, useState } from 'react'

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
const useProvideChat = (): ChatType => {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: 'system',
      content:
        "'As a friendly habit formation consultant, your goal is to help users discover a specific easily performed, and trackable habit. Use fewer than 5 concise questions to gather essential user information.\n" +
        '\n' +
        'This application has 2 Plugins that help you form habits: Meditation: to form the habit of meditating, finance to start saving money and invest for the future.\n' +
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

  const generateSettings = useCallback(async () => {
    const promt =
      'SettingsCreateSettingsRequest {\n' +
      'elevator:{\n' +
      'amountNotifications: number;\n' +
      'goal: number;\n' +
      'notifications: boolean;\n' +
      'periodNotifications: {"weekly"|"monthly"|"daily"};\n' +
      '}\n' +
      'enabledPlugins:{}\n' +
      'finance:{\n' +
      'amountNotifications: number;\n' +
      'investmentGoal: number;\n' +
      'investmentTimeGoal: number;\n' +
      'notifications: boolean;\n' +
      'periodNotifications: {"weekly"|"monthly"|"daily"};\n' +
      'strategy: SettingsStrategyType;\n' +
      'strategyAmount: number;\n' +
      '}\n' +
      'meditation:{\n' +
      'amountNotifications: number;\n' +
      'meditationTimeGoal: number;\n' +
      'notifications: boolean;\n' +
      'periodNotifications: {"weekly"|"monthly"|"daily"};\n' +
      '}' +
      'use the chat above and the to fill out this json, use the given types to fill it out and only respond with the json nothing else'

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
      console.log(res)
    } catch (e) {
      console.log(e)
    }
  }, [messages])

  return {
    sendMessage,
    messages,
    setMessages,
    generateSettings,
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
