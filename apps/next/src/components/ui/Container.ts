import styled, { css } from 'styled-components'

import {
  EXTRA_LARGE_DEVICES_MAX_WIDTH,
  LARGE_DEVICES_MAX_WIDTH,
  MAX_WIDTH_PADDING,
  MEDIUM_DEVICES_MAX_WIDTH,
  SMALL_DEVICES_MAX_WIDTH,
} from '../../theme/makeTheme'
import { makeQuery, __MEDIA_QUERY_BREAK_POINT } from '../helpers/makeQuery'
import { Flex, FlexProps } from './Flex'

// with props use this:
// ${props => mediaQueries("md")(`width: ${props.width}px`)}
const Media = css`
  ${makeQuery(__MEDIA_QUERY_BREAK_POINT.SMALL)(`
      max-width: ${SMALL_DEVICES_MAX_WIDTH}px
  `)};

  ${makeQuery(__MEDIA_QUERY_BREAK_POINT.MEDIUM)(`
      max-width: ${MEDIUM_DEVICES_MAX_WIDTH}px;
  `)};

  ${makeQuery(__MEDIA_QUERY_BREAK_POINT.LARGE)(`
      max-width: ${LARGE_DEVICES_MAX_WIDTH}px
  `)};

  ${makeQuery(__MEDIA_QUERY_BREAK_POINT.EXTRA_LARGE)(`
      max-width: ${EXTRA_LARGE_DEVICES_MAX_WIDTH}px
  `)};
`

const ContainerRoot = css`
  padding-right: ${MAX_WIDTH_PADDING}px;
  padding-left: ${MAX_WIDTH_PADDING}px;
  width: 100%;
  margin-right: auto;
  margin-left: auto;
  box-sizing: border-box;
`

export type ContainerProps = {
  fluid?: boolean
  fullViewPortHeight?: boolean
}

export const Container = styled(Flex)<ContainerProps & FlexProps>`
  ${(props) => (!props.fluid ? Media : null)};
  ${({ fullViewPortHeight }) =>
    fullViewPortHeight &&
    `min-height: 100vh;
  `};
  ${ContainerRoot};
`
