import { SPACING, __COLORS } from 'app/theme/theme'
import { Heading4 } from 'app/theme/typography'
import Link from 'next/link'
import { PropsWithChildren } from 'react'
import styled from 'styled-components'
import { Flex } from '../ui/Flex'
import { MaxWidthContainer } from '../ui/MaxWidthContainer'

export const HEADER_HEIGHT = 75

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
  gap: ${SPACING * 2}px;
`

const StyledLink = styled(Link)`
  text-decoration: none;
  &:focus,
  &:hover,
  &:visited,
  &:link,
  &:active {
    text-decoration: none;
  }
`

type MenuItemProps = { link: string } & PropsWithChildren
const MenuItem = ({ link, children }: MenuItemProps) => (
  <StyledLink href={link}>
    <Heading4 color={__COLORS.WHITE}>{children}</Heading4>
  </StyledLink>
)

type RouteType = { link: string; text: string }
const routes: RouteType[] = [
  { link: '/', text: 'Home' },
  { link: '/settings', text: 'Settings' },
]

const Header = () => {
  return (
    <FullWidthContainer row align={'center'}>
      <HeaderContent>
        {routes.map((route) => (
          <MenuItem key={route.text} link={route.link}>{route.text}</MenuItem>
        ))}
      </HeaderContent>
    </FullWidthContainer>
  )
}

export default Header
