import { signOut } from 'app/auth/auth'
import { useAuth } from 'app/hooks/useAuth'
import { COLORS, HEADER_HEIGHT, OUTER_BORDER_RADIUS, SIDEBAR_WIDTH, SPACING } from 'app/theme/theme'
import { Heading6 } from 'app/theme/typography'
import { Flex } from 'axelra-styled-bootstrap-grid'
import { PropsWithChildren } from 'react'
import styled from 'styled-components'
import OptionalLink from '../OptionalLink'
import { MaxWidthContainer } from '../ui/MaxWidthContainer'

const FullWidthContainer = styled(Flex)`
  z-index: 10;
  height: ${HEADER_HEIGHT}px;
  border: 1px solid ${COLORS.BLACK};
  background-color: ${COLORS.TAB_BAR};
  border-radius: ${OUTER_BORDER_RADIUS}px;
  flex-direction: column;
  position: absolute;
  


  @media only screen and (min-width: ${(p) => p.theme.breakPoints.sm}px) {
    z-index: 10;
    height: calc(100% - ${HEADER_HEIGHT}px);
    width: ${SIDEBAR_WIDTH}px;
    flex-direction: row;
    position: absolute;
  }
`

const HeaderContent = styled(Flex)`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: ${SPACING * 2}px;

`

const HeaderLinks = styled(Flex)`
  flex-direction: row;
  gap: ${SPACING * 2}px;
  margin: 0;
  padding: 0;
  

  @media only screen and (min-width: ${(p) => p.theme.breakPoints.sm}px) {
    flex-direction: column;
    align-items: flex-start;
    padding-left: ${SPACING * 4}px;
  }
`


type MenuItemProps = { link?: string; onPress?: () => void } & PropsWithChildren
const MenuItem = ({ link, children, onPress }: MenuItemProps) => (
  <OptionalLink href={link}>
    <Heading6 color={COLORS.BLACK} onPress={!link ? onPress : undefined}>
      {children}
    </Heading6>
  </OptionalLink>
)

type RouteType = { link: string; text: string }
const routes: RouteType[] = [
  { link: '/', text: 'Home' },
  { link: '/settings', text: 'Settings' },
  { link: '/discover', text: 'Discover' },
  { link: '/dashboard', text: 'Dashboard' },
]

const SideBar = () => {
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
      </HeaderContent>
    </FullWidthContainer>
  )
}

export default SideBar
