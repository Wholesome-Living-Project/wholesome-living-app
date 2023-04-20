import styled from 'styled-components'
import { COLORS, HEADER_HEIGHT, OUTER_BORDER_RADIUS, SIDEBAR_WIDTH, SPACING, FILTER_HEIGHT } from 'app/theme/theme'
import { Flex } from 'axelra-styled-bootstrap-grid'


export const MainContentContainer = styled(Flex)`
  border: 1px solid ${COLORS.BLACK};
  background-color: ${COLORS.TAB_BAR};
  border-radius: ${OUTER_BORDER_RADIUS}px;
  height: calc(100% - ${HEADER_HEIGHT}px - ${FILTER_HEIGHT}px);

  @media only screen and (min-width: ${(p) => p.theme.breakPoints.sm}px) {
    height: calc(100% - ${HEADER_HEIGHT}px - ${FILTER_HEIGHT}px);

  }
`
