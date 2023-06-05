import FinanceGraph from 'app/components/dashboard/Graphs/FinanceGraph'
import FinanceForm from 'app/components/dashboard/Other/FinanceForm'
import FinanceTable from 'app/components/dashboard/Other/FinanceTable'
import { MainContentContainer } from 'app/components/ui/MainContentContainer'
import { Flex } from 'axelra-styled-bootstrap-grid'
import React from 'react'
import styled from 'styled-components'

const FlexContainer = styled(Flex)`
  height: 100%;
  position: relative;
  flex-direction: row;

  @media (max-width: 768px) {
    flex-direction: column;
  }
`

const FinanceView = () => {
  return (
    <FlexContainer>
      <MainContentContainer>
        <FinanceGraph />
        <FinanceForm />
        <FinanceTable />
      </MainContentContainer>
    </FlexContainer>
  )
}

export default FinanceView
