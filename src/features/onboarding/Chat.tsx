import React, { useCallback, useState } from 'react'
import { ScrollView, Text } from 'react-native'
import styled from 'styled-components'
import Button from '../../components/ui/Button'
import { Flex } from '../../components/ui/Flex'
import Input from '../../components/ui/Input'
import Spacer from '../../components/ui/Spacer'
import { useWindowDimensions } from '../../hooks/useWindowDimensions'
import { useChat } from '../../provider/ChatProvider'
import { COLORS, EXTRA_COLORS, SPACING } from '../../theme/theme'
import { Heading6 } from '../../theme/typography'

const StyledScrollView = styled(ScrollView)`
  height: 70%;
`

const Footer = styled(Flex)`
  padding: 0 ${SPACING * 2}px;
  position: absolute;
  bottom: 0;
  width: 100%;
  background-color: ${COLORS.WHITE};
  padding: ${SPACING * 2}px;
  border-top-right-radius: 20px;
  border-top-left-radius: 20px;
`

const Message = styled(Flex)<{ isUser: boolean }>`
  background-color: ${(p) => (p.isUser ? EXTRA_COLORS.BLUE : COLORS.WHITE)};
  border-radius: 20px;
  padding: ${SPACING * 2}px;
  margin-bottom: ${SPACING}px;
  width: 300px;
  margin-right: ${(p) => (p.isUser ? 0 : 'auto')};
  margin-left: ${(p) => (p.isUser ? 'auto' : 0)};
`

const Chat = () => {
  const { windowHeight } = useWindowDimensions()
  const { sendMessage, messages } = useChat()
  const [message, setMessage] = useState('')

  const onSend = useCallback(() => {
    sendMessage(message)

    setMessage('')
  }, [message, sendMessage])

  if (!messages) return

  return (
    <Flex style={{ height: windowHeight }} column justify={'space-between'}>
      <Flex>
        <Spacer x={4} />
        <StyledScrollView>
          {messages.map((m, i) => (
            <Message key={i} isUser={m.role === 'user'} row align={'center'}>
              <Heading6>{m.role === 'user' ? 'You' : 'Assistant'}</Heading6>
              <Spacer x={2} />
              <Text>{m.content}</Text>
            </Message>
          ))}
        </StyledScrollView>
      </Flex>
      <Footer row>
        <Input
          value={message}
          onChangeText={(value: string) => setMessage(value)}
          placeholder={'Your message'}
        />
        <Spacer x={2} />
        <Button onPress={onSend} small>
          Send
        </Button>
      </Footer>
    </Flex>
  )
}

export default Chat
