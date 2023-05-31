import React, { PropsWithChildren } from 'react'
import { Keyboard, Pressable } from 'react-native'
import styled from 'styled-components'

const Wrapper = styled(Pressable)`
  flex: 1;
`

// Can be used to close keyboard when user taps outside of input
const KeyboardCloseHandleComponent = ({ children }: PropsWithChildren) => {
  return <Wrapper onPress={() => Keyboard.dismiss()}>{children}</Wrapper>
}

export default KeyboardCloseHandleComponent
