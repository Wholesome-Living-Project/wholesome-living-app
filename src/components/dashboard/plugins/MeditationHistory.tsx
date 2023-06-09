import React, { Fragment } from 'react'
import { Divider } from 'react-native-elements'
import styled from 'styled-components'
import { useMeditate } from '../../../provider/MeditationContentProvider'
import { Heading4 } from '../../../theme/typography'
import { Flex } from '../../ui/Flex'
import Spacer from '../../ui/Spacer'
import MeditationListItem from './MeditationListItem'

const ListTitle = styled(Heading4)`
  padding: 0;
`

const MeditationHistory = () => {
  const { meditations } = useMeditate()

  if (meditations?.meditations?.length === 0) return null

  return (
    <Flex column>
      <ListTitle>History</ListTitle>
      <Spacer x={1} />

      {meditations?.meditations?.map((meditation, i) => (
        <Fragment key={i}>
          <MeditationListItem meditation={meditation} />
          <Divider />
        </Fragment>
      ))}
    </Flex>
  )
}

export default MeditationHistory
