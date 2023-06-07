import React from 'react'
import styled from 'styled-components'
import { useWindowDimensions } from '../../../hooks/useWindowDimensions'
import { COLORS, OUTER_BORDER_RADIUS, SPACING } from '../../../theme/theme'
import { Light, Regular } from '../../../theme/typography'
import { Flex } from '../../ui/Flex'
import MakeSpacing from '../../ui/MakeSpacing'

const ListContainer = styled(Flex)`
  border-color: ${COLORS.PRIMARY};
  border-radius: ${OUTER_BORDER_RADIUS}px;
  padding: ${SPACING}px 0 ${SPACING * 2}px;
  width: 100%;
`

export enum ListItemActions {
  DELETE = 'DELETE',
  EDIT = 'EDIT',
  MOVE = 'MOVE',
}

export type ListItemProps = {
  title: string
  content: string
  possibleActions: ListItemActions
}
const ListItem = ({ possibleActions, content, title }: ListItemProps) => {
  const { windowWidth } = useWindowDimensions()
  return (
    <ListContainer row width={windowWidth} align={'flex-end'} justify={'space-between'}>
      <Light color={COLORS.DARK_GREY}>{title}</Light>
      <MakeSpacing x={4} />
      <Regular>{content}</Regular>
    </ListContainer>
  )
}

export default ListItem
