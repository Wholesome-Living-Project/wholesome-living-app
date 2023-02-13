import React from 'react'
import { MotiLink } from 'solito/moti'
import styled from 'styled-components/native'
import Background from '../../components/Background'
import Button from '../../components/Button'
import Spacer from '../../components/Spacer'

const Row = styled.View`
  display: flex;
  flex-direction: row;
`

export function HomeScreen() {
  return (
    <Background>
      <Row>
        <MotiLink
          href="/user/primary"
          animate={({ hovered, pressed }) => {
            'worklet'
            return {
              scale: pressed ? 0.9 : 1,
            }
          }}
          from={{
            scale: 1,
          }}
          transition={{
            type: 'timing',
            duration: 100,
          }}>
          <Button>Primary</Button>
        </MotiLink>
        <Spacer x={2} />
        <MotiLink
          href="/user/secondary"
          animate={({ hovered, pressed }) => {
            'worklet'
            return {
              scale: pressed ? 0.9 : 1,
            }
          }}
          from={{
            scale: 1,
          }}
          transition={{
            type: 'timing',
            duration: 100,
          }}>
          <Button buttonType={'secondary'}>Secondary</Button>
        </MotiLink>
        <Spacer x={2} />
        <MotiLink
          href="/user/cta"
          animate={({ hovered, pressed }) => {
            'worklet'
            return {
              scale: pressed ? 0.9 : 1,
            }
          }}
          from={{
            scale: 1,
          }}
          transition={{
            type: 'timing',
            duration: 100,
          }}>
          <Button buttonType={'cta'}>CTA</Button>
        </MotiLink>
      </Row>
    </Background>
  )
}
