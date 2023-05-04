import { useAuth } from 'app/hooks/useAuth'
import { COLORS, FOOTER_HEIGHT } from 'app/theme/theme'
import { Regular } from 'app/theme/typography'
import { Flex } from 'axelra-styled-bootstrap-grid'
import { PropsWithChildren } from 'react'
import styled from 'styled-components'
import OptionalLink from '../OptionalLink'
import { MaxWidthContainer } from '../ui/MaxWidthContainer'

const FullWidthContainer = styled.footer`
  width: 100%;
  position: relative;
  z-index: 10;
  top: 0;
  height: ${FOOTER_HEIGHT}px;
  background: ${COLORS.WHITE};
  flex-direction: row;
`

const FooterContent = styled(MaxWidthContainer)`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  letter-spacing: 4px;
`

const FooterLinks = styled(Flex)`
  margin: 0;
  padding: 0;
  align-items: flex-start;
`

type MenuItemProps = { link?: string; onPress?: () => void } & PropsWithChildren
const MenuItem = ({ link, children, onPress }: MenuItemProps) => (
  <OptionalLink href={link}>
    <Regular color={COLORS.BLACK} onPress={!link ? onPress : undefined}>
      {children}
    </Regular>
  </OptionalLink>
)

type RouteType = { link: string; text: string }
const routes: RouteType[] = []

const Footer = () => {
  const user = useAuth()
  return (
    <FullWidthContainer>
      <FooterContent>
        <FooterLinks column>
          {routes.map((route) => (
            <MenuItem key={route.text} link={route.link}>
              {route.text}
            </MenuItem>
          ))}
          <MenuItem link={'/'}>About us</MenuItem>
          <MenuItem link={'/'}>FAQ</MenuItem>
          <MenuItem link={'/'}>Privacy Policy</MenuItem>
        </FooterLinks>

        <MenuItem link={'/'}>ZKB</MenuItem>
      </FooterContent>
    </FullWidthContainer>
  )
}

export default Footer
