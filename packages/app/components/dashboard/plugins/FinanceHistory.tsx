import MeditationListItem from 'app/components/dashboard/plugins/MeditationListItem'
import { Flex } from 'app/components/ui/Flex'
import { useMeditate } from 'app/provider/MeditationContentProvider'
import React, { Fragment } from 'react'
import { Divider } from 'react-native-elements'
import {useFinance} from "app/provider/FinanceContentProvider";
import FinanceListItem from "app/components/dashboard/plugins/FinanceListItem";


const FinanceHistory = () => {
  const { spendings } = useFinance()


  return (
    <Flex column>
      {spendings.map((spending, i) => (
        <Fragment key={i}>
          <FinanceListItem spending={spending} />
          <Divider />
        </Fragment>
      ))}
    </Flex>
  )
}

export default FinanceHistory
