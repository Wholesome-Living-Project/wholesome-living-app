import { signOut } from 'app/auth/auth'
import { useAuth } from 'app/hooks/useAuth'
import { HEADER_HEIGHT, SPACING, __COLORS } from 'app/theme/theme'
import { Heading4 } from 'app/theme/typography'
import { Flex } from 'axelra-styled-bootstrap-grid'
import { PropsWithChildren } from 'react'
import styled from 'styled-components'
import OptionalLink from '../OptionalLink'
import { MaxWidthContainer } from '../ui/MaxWidthContainer'

const FullWidthContainer = styled(Flex)`
  width: 100%;
  position: absolute;
  z-index: 10;
  top: 0;
  height: ${HEADER_HEIGHT}px;
  background: ${__COLORS.PRIMARY};
`

const HeaderContent = styled(MaxWidthContainer)`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`

const HeaderLinks = styled(Flex)`
  gap: ${SPACING * 2}px;
  margin: 0;
  padding: 0;
`

type MenuItemProps = { link?: string; onPress?: () => void } & PropsWithChildren
const MenuItem = ({ link, children, onPress }: MenuItemProps) => (
  <OptionalLink href={link}>
    <Heading4 color={__COLORS.WHITE} onPress={!link ? onPress : undefined}>
      {children}
    </Heading4>
  </OptionalLink>
)

type RouteType = { link: string; text: string }
const routes: RouteType[] = [
  { link: '/', text: 'Home' },
  { link: '/settings', text: 'Settings' },
]

const Header = () => {
  // TODO actually add this to the react lifecycle through redux or some other hook
  const user = useAuth()
  return (
    <FullWidthContainer row align={'center'}>
      <HeaderContent>
        <HeaderLinks row>
          {routes.map((route) => (
            <MenuItem key={route.text} link={route.link}>
              {route.text}
            </MenuItem>
          ))}
        </HeaderLinks>
        {user ? (
          <MenuItem onPress={() => signOut()}>Logout</MenuItem>
        ) : (
          <MenuItem link={'/register'}>Register</MenuItem>
        )}
      </HeaderContent>
    </FullWidthContainer>
  )
}

export default Header
