import FinanceGraph from 'app/components/dashboard/Graphs/FinanceGraph'
import FinanceForm from 'app/components/dashboard/Other/FinanceForm'
import FinanceTable from 'app/components/dashboard/Other/FinanceTable'
import PluginList from 'app/components/discover/web/PluginList'
import { MainContentContainer } from 'app/components/ui/MainContentContainer'
import Spacer from 'app/components/ui/Spacer'
import { COLORS, FILTER_HEIGHT, OUTER_BORDER_RADIUS } from 'app/theme/theme'
import { Col, Flex, Row, SPACING } from 'axelra-styled-bootstrap-grid'
import styled from 'styled-components'

const FlexContainer = styled(Flex)`
  height: 100%;
  position: relative;
  gap: ${SPACING * 2}px;

  @media (max-width: 768px) {
    flex-direction: column;
  }
`

const FilterContainer = styled(Flex)`
  height: ${FILTER_HEIGHT}px;
  width: 100%;
  background-color: ${COLORS.WHITE};
  border-radius: ${OUTER_BORDER_RADIUS}px;
  flex-direction: column;
`

const ContentContainer = styled(Flex)`
  padding: 0 ${SPACING * 1.5}px;
`

const PluginContentContainer = styled(Flex)`
  padding: ${SPACING * 1.5}px;
`

const Dashboard = () => {
  return (
    <FlexContainer>
      <Col xs={12} md={4}>
        <FilterContainer>
          <PluginContentContainer>
            <PluginList />
          </PluginContentContainer>
        </FilterContainer>
      </Col>
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

export default Dashboard
