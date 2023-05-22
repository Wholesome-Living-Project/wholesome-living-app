import ListItem, { ListItemActions } from 'app/components/dashboard/plugins/ListItem'
import { getFormattedTimer } from 'app/helpers/getFormattedTimer'
import React from 'react'
import { MeditationGetMeditationResponse } from '../../../../api/openapi'

type Props = {
  meditation: MeditationGetMeditationResponse
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
