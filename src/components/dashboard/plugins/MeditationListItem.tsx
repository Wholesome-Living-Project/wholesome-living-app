import React from 'react'
import { MeditationMeditationDB } from '../../../../api/openapi'
import { getFormattedTimer } from '../../../helpers/getFormattedTimer'
import ListItem, { ListItemActions } from './ListItem'

type Props = {
  meditation: MeditationMeditationDB
}
const MeditationListItem = ({ meditation }: Props) => {
  const { meditationTime, endTime } = meditation
  return (
    <ListItem
      title={new Date(endTime ? endTime * 1000 : '').toLocaleDateString()}
      content={getFormattedTimer(Number(meditationTime ?? 0))}
      possibleActions={ListItemActions.DELETE}
    />
  )
}

export default MeditationListItem
