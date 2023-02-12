import { Row } from 'dripsy'
import { MotiLink } from 'solito/moti'
import Background from '../../theme/components/Background'
import Button from '../../theme/components/Button'
import Spacer from '../../theme/components/Spacer'

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
          <Button type={'secondary'}>Secondary</Button>
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
          <Button type={'cta'}>CTA</Button>
        </MotiLink>
      </Row>
    </Background>
  )
}
