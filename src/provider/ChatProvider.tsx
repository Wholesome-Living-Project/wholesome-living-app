import axios from 'axios'
import Constants from 'expo-constants'
import React, { createContext, PropsWithChildren, useCallback, useContext, useState } from 'react'

type ChatType = {
  sendMessage: (message: string) => void
  messages: Message[]
  setMessages: (st: Message[]) => void
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
      content: 'hey',
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

  return {
    sendMessage,
    messages,
    setMessages,
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
