import styled from 'styled-components'
import { MaxWidthContainer } from './MaxWidthContainer'
import { COLORS, HEADER_HEIGHT, OUTER_BORDER_RADIUS, SIDEBAR_WIDTH, SPACING } from 'app/theme/theme'
import { Flex } from 'axelra-styled-bootstrap-grid'


export const MaxWidthFlex = styled(Flex)`
  border: 1px solid ${COLORS.BLACK};
  background-color: ${COLORS.TAB_BAR};
  border-radius: ${OUTER_BORDER_RADIUS}px;
  height: 100%;
  margin-top: ${SPACING * 2}px;

  @media only screen and (min-width: ${(p) => p.theme.breakPoints.sm}px) {
    margin-left: ${SPACING * 2}px;
    height: calc(100% - ${HEADER_HEIGHT}px);

  }
`
