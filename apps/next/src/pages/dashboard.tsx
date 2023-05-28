import FinanceGraph from 'app/components/dashboard/Graphs/FinanceGraph'
import PluginList from 'app/components/discover/web/PluginList'
import { MainContentContainer } from 'app/components/ui/MainContentContainer'
import Spacer from 'app/components/ui/Spacer'
import { COLORS, FILTER_HEIGHT, OUTER_BORDER_RADIUS } from 'app/theme/theme'
import { Flex, SPACING } from 'axelra-styled-bootstrap-grid'
import styled from 'styled-components'

const FlexContainer = styled(Flex)`
  height: 100%;
  position: relative;
  gap: ${SPACING * 2}px;
`

const FilterContainer = styled(Flex)`
  height: ${FILTER_HEIGHT}px;
  width: 100%;
  background-color: ${COLORS.WHITE};
  //box-shadow: 0 8px 8px -4px;
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
    <FlexContainer column>
      <FilterContainer>
        <PluginContentContainer column>
          <PluginList />
        </PluginContentContainer>
      </FilterContainer>
      <MainContentContainer column>
        <ContentContainer column>
          <FinanceGraph />
        </ContentContainer>
      </MainContentContainer>
      <Spacer x={40} />
    </FlexContainer>
  )
}

export default Dashboard
