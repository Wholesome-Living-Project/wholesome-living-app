import React, { Fragment, useCallback, useEffect, useRef, useState } from 'react'
import { KeyboardAvoidingView, ScrollView, Text } from 'react-native'
import { useNavigation } from 'solito/build/router/use-navigation'
import styled from 'styled-components'
import Button from '../../components/ui/Button'
import { Flex } from '../../components/ui/Flex'
import Input from '../../components/ui/Input'
import KeyboardCloseHandleComponent from '../../components/ui/KeyboardCloseHandleComponent'
import Spacer from '../../components/ui/Spacer'
import useKeyboard from '../../hooks/useKeyboard'
import { useWindowDimensions } from '../../hooks/useWindowDimensions'
import { useChat } from '../../provider/ChatProvider'
import { COLORS, EXTRA_COLORS, SPACING } from '../../theme/theme'
import { Regular } from '../../theme/typography'

const StyledScrollView = styled(ScrollView)<{ height: number }>`
  height: ${(p) => p.height}px;
  position: relative;
`

const Footer = styled(KeyboardAvoidingView)<{ bottom: number }>`
  padding: 0 ${SPACING * 2}px;
  position: absolute;
  bottom: ${(p) => p.bottom}px;
  width: 100%;
  background-color: ${COLORS.WHITE};
  padding: ${SPACING * 3}px ${SPACING * 2}px ${SPACING * 6}px;
  border-top-right-radius: 20px;
  border-top-left-radius: 20px;
  flex-direction: row;
`

const MessageHeader = styled(Flex)`
  padding: 0 ${SPACING * 1.5}px;
`

const Message = styled(Flex)<{ isUser: boolean }>`
  background-color: ${(p) => (p.isUser ? EXTRA_COLORS.BLUE_LIGHT : COLORS.WHITE)};
  border-radius: 20px;
  padding: ${SPACING * 2}px;
  max-width: 320px;
  min-width: 60px;
  margin-right: ${(p) => (p.isUser ? `${SPACING}px` : 'auto')};
  margin-left: ${(p) => (p.isUser ? 'auto' : `${SPACING}px`)};
  border: solid ${COLORS.PRIMARY};
  flex: 1;
`

const ChatText = styled(Text)`
  word-break: break-all;
`

const Chat = () => {
  const { sendMessage, messages, setMessages } = useChat()
  const [message, setMessage] = useState('')
  const { keyboardOpen, keyboardHeight } = useKeyboard()

  const scrollRef = useRef<ScrollView | null>(null)
  const { windowHeight } = useWindowDimensions()
  const [footerHeight, setFooterHeight] = useState(0)

  const navigation = useNavigation()

  const onSend = useCallback(async () => {
    setMessages([
      ...messages,
      {
        content: message,
        role: 'user',
      },
    ])
    setMessage('')
    await sendMessage(message)
  }, [message, messages, sendMessage, setMessages])

  useEffect(() => {
    if (!messages) return
    setTimeout(() => scrollRef.current?.scrollToEnd({ animated: true }), 50)
  }, [messages])

  useEffect(() => {
    if (!keyboardOpen) return
    setTimeout(() => scrollRef.current?.scrollToEnd({ animated: true }), 50)
  }, [keyboardOpen])

  if (!messages) return

  return (
    <Flex style={{ height: windowHeight }} column justify={'space-between'}>
      <Flex>
        <Spacer x={4} />
        <StyledScrollView
          ref={scrollRef}
          height={windowHeight - (keyboardOpen ? keyboardHeight + footerHeight : footerHeight)}>
          <KeyboardCloseHandleComponent>
            <Spacer x={8} />
            {messages.map((m, i) => {
              if (m.role === 'system') return
              return (
                <Fragment key={i}>
                  <MessageHeader column align={m.role === 'user' ? 'flex-end' : 'flex-start'}>
                    <Regular>{m.role === 'user' ? 'You' : 'AI Bot'}</Regular>
                  </MessageHeader>
                  <Message isUser={m.role === 'user'} column align={'center'}>
                    <ChatText>{m.content}</ChatText>
                  </Message>
                </Fragment>
              )
            })}
            <Spacer x={8} />
          </KeyboardCloseHandleComponent>
        </StyledScrollView>
      </Flex>
      <Footer
        bottom={keyboardOpen ? keyboardHeight : 0}
        onLayout={(e) => {
          const height = e.nativeEvent?.layout.height
          height && setFooterHeight(height)
        }}>
        {messages.length <= 12 ? (
          <>
            <Input
              value={message}
              onChangeText={(value: string) => setMessage(value)}
              placeholder={'Your message'}
              multiline
              minHeight={80}
            />
            <Spacer x={2} />
            <Flex>
              <Button onPress={onSend} small>
                Send
              </Button>
            </Flex>
          </>
        ) : (
          <Button onPress={() => navigation?.navigate('choose-plugins')} fullWidth>
            continue
          </Button>
        )}
      </Footer>
    </Flex>
  )
}

export default Chat
