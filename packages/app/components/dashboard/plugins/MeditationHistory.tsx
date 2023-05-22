import MeditationListItem from 'app/components/dashboard/plugins/MeditationListItem'
import { Flex } from 'app/components/ui/Flex'
import { useMeditate } from 'app/provider/MeditationContentProvider'
import React, { Fragment } from 'react'
import { Divider } from 'react-native-elements'

const MeditationHistory = () => {
  const { meditations } = useMeditate()

  return (
    <Flex column>
      {meditations.map((meditation, i) => (
        <Fragment key={meditation.endTime}>
          <MeditationListItem meditation={meditation} />
          <Divider />
        </Fragment>
      ))}
    </Flex>
  )
}

export default MeditationHistory
