import FinanceGraph from 'app/components/dashboard/Graphs/FinanceGraph'
import FinanceForm from 'app/components/dashboard/Other/FinanceForm'
import FinanceTable from 'app/components/dashboard/Other/FinanceTable'
import { MainContentContainer } from 'app/components/ui/MainContentContainer'
import Spacer from 'app/components/ui/Spacer'
import { Col, Flex, Row, SPACING } from 'axelra-styled-bootstrap-grid'
import React from 'react'
import styled from 'styled-components'

const FlexContainer = styled(Flex)`
  height: 100%;
  position: relative;
  gap: ${SPACING * 2}px;

  @media (max-width: 768px) {
    flex-direction: column;
  }
`

const ContentContainer = styled(Flex)`
  padding: 0 ${SPACING * 1.5}px;
`

const FinanceView = () => {
  return (
    <FlexContainer>
      <Col xs={12} md={8}>
        <MainContentContainer>
          <ContentContainer>
            <Row>
              <Col xs={12} lg={6}>
                <FinanceForm />
              </Col>
              <Col xs={12} lg={6}>
                <FinanceGraph />
              </Col>
            </Row>
            <Row>
              <Col xs={12}>
                <FinanceTable />
              </Col>
            </Row>
          </ContentContainer>
        </MainContentContainer>
      </Col>
      <Spacer x={40} />
    </FlexContainer>
  )
}

export default FinanceView
