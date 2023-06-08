import React, { Fragment, useCallback, useEffect, useRef, useState } from 'react'
import {
  ActivityIndicator,
  Image,
  KeyboardAvoidingView,
  LogBox,
  ScrollView,
  Text,
} from 'react-native'
import Ionicons from 'react-native-vector-icons/Ionicons'
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
import { coachProfiles, useOnboarding } from '../../provider/OnboardingProvider'
import { COLORS, SPACING } from '../../theme/theme'
import { Body } from '../../theme/typography'

// Ignore specific warning messages
LogBox.ignoreLogs(['This synthetic event is reused for performance reasons'])

const StyledScrollView = styled(ScrollView)<{ height: number }>`
  height: ${(p) => p.height}px;
  margin-top: ${SPACING * 2}px;
  position: relative;
`

const Footer = styled(KeyboardAvoidingView)<{ bottom: number }>`
  position: absolute;
  bottom: ${(p) => p.bottom}px;
  width: 100%;
  background-color: ${COLORS.WHITE};
  padding: ${SPACING * 3}px ${SPACING * 2}px ${SPACING * 17}px;
  border-top-right-radius: 20px;
  border-top-left-radius: 20px;
  flex-direction: row;
`

const ProfileImage = styled(Image)`
  width: 50px;
  height: 50px;
`

const MessageHeader = styled(Flex)`
  padding: 0 ${SPACING * 1.5}px;
`

const Message = styled(Flex)<{ isUser: boolean; maxWidth: number }>`
  background-color: ${(p) => (p.isUser ? COLORS.PRIMARY : COLORS.WHITE)};
  border-radius: 8px;
  position: relative;
  padding: ${SPACING * 2}px;
  max-width: ${(p) => p.maxWidth}px;
  min-width: 60px;
  margin-right: ${(p) => (p.isUser ? `${SPACING}px` : 'auto')};
  margin-left: ${(p) => (p.isUser ? 'auto' : `${SPACING}px`)};
  margin-bottom: ${SPACING * 2}px;
  border: solid ${COLORS.PRIMARY} 0.5px;
  border-bottom-left-radius: ${(p) => (p.isUser ? `${SPACING}px` : '0px')};
  border-bottom-right-radius: ${(p) => (p.isUser ? '0px' : `${SPACING}px`)};
  flex: 1;
`

const ChatText = styled(Text)<{ isUser: boolean }>`
  word-break: break-all;
  color: ${(p) => (p.isUser ? COLORS.WHITE : 'black')};
`

const Chat = () => {
  const { sendMessage, messages, setMessages, generateSettings } = useChat()
  const [message, setMessage] = useState('')
  const { keyboardOpen, keyboardHeight } = useKeyboard()
  const [loading, setLoading] = useState(false)
  const scrollRef = useRef<ScrollView | null>(null)
  const { windowHeight, windowWidth } = useWindowDimensions()
  const [footerHeight, setFooterHeight] = useState(0)
  const { coach } = useOnboarding()

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

  const onContinue = useCallback(async () => {
    setLoading(true)
    await generateSettings()
    setLoading(false)
    navigation?.navigate('choose-plugins')
  }, [generateSettings, navigation])

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
        <Spacer x={2} />
        <StyledScrollView
          ref={scrollRef}
          height={windowHeight - (keyboardOpen ? keyboardHeight + footerHeight : footerHeight)}>
          <KeyboardCloseHandleComponent>
            {messages.map((m, i) => {
              if (m.role === 'system') return
              return (
                <Fragment key={i}>
                  <Flex row align={'flex-end'}>
                    <MessageHeader
                      column
                      align={m.role === 'user' ? 'flex-end' : 'flex-start'}
                      justify={'center'}>
                      {m.role !== 'user' && (
                        <Flex column align={'center'}>
                          <ProfileImage source={coachProfiles[coach]} />
                          <Body>{'Coach'}</Body>
                        </Flex>
                      )}
                    </MessageHeader>
                    <Message
                      isUser={m.role === 'user'}
                      column
                      align={'center'}
                      maxWidth={windowWidth * 0.65}>
                      <ChatText isUser={m.role === 'user'}>{m.content}</ChatText>
                    </Message>
                  </Flex>
                </Fragment>
              )
            })}
            <Spacer x={8} />
          </KeyboardCloseHandleComponent>
        </StyledScrollView>
      </Flex>
      <Footer
        bottom={keyboardOpen ? keyboardHeight - SPACING * 2 : 0}
        onLayout={(e) => {
          try {
            const { height } = e.nativeEvent.layout
            height && setFooterHeight(height)
          } catch (e) {
            console.log(e)
          }
        }}>
        {messages.length <= 12 ? (
          <>
            <Input
              value={message}
              onChangeText={(value: string) => setMessage(value)}
              placeholder={'Your message'}
              multiline
            />
            <Spacer x={2} />
            <Flex>
              <Button onPress={onSend} small buttonType={'black'}>
                <Ionicons name="arrow-up" color={'white'} size={25} />
              </Button>
            </Flex>
          </>
        ) : (
          <Button onPress={onContinue} disabled={loading} fullWidth>
            {loading ? <ActivityIndicator></ActivityIndicator> : <Text>continue</Text>}
          </Button>
        )}
      </Footer>
    </Flex>
  )
}

export default Chat
