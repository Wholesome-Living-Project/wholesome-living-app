import React, { Fragment } from 'react'
import { Divider } from 'react-native-elements'
import { useMeditate } from '../../../provider/MeditationContentProvider'
import { Flex } from '../../ui/Flex'
import MeditationListItem from './MeditationListItem'

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
