import { Flex } from 'app/components/ui/Flex'
import MakeSpacing from 'app/components/ui/MakeSpacing'
import { useWindowDimensions } from 'app/hooks/useWindowDimensions'
import { COLORS, OUTER_BORDER_RADIUS, SPACING } from 'app/theme/theme'
import { Light, Regular } from 'app/theme/typography'
import React from 'react'
import styled from 'styled-components'

const ListContainer = styled(Flex)<{ width: number }>`
  border-color: ${COLORS.PRIMARY};
  border-radius: ${OUTER_BORDER_RADIUS}px;
  padding: ${SPACING}px;
  width: ${(p) => p.width}px;
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
    <ListContainer row width={windowWidth}>
      <Light>{title}</Light>
      <MakeSpacing x={4} />
      <Regular>{content}</Regular>
    </ListContainer>
  )
}

export default ListItem
