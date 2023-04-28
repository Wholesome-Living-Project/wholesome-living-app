import PluginList from 'app/components/discover/PluginList'
import { MainContentContainer } from 'app/components/ui/MainContentContainer'
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
  border: 1px solid ${COLORS.BLACK};
  background-color: ${COLORS.TAB_BAR};
  border-radius: ${OUTER_BORDER_RADIUS}px;
`

const ContentContainer = styled(Flex)`
  padding: ${SPACING * 2}px;
`

const Dashboard = () => {
  return (
    <FlexContainer column>
      <FilterContainer>
        <ContentContainer column>
          <PluginList />
        </ContentContainer>
      </FilterContainer>
      <MainContentContainer column>
        <ContentContainer column>This is the dashboard page</ContentContainer>
      </MainContentContainer>
    </FlexContainer>
  )
}

export default Dashboard
