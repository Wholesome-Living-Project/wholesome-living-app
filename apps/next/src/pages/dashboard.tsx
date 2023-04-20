import { MainContentContainer } from 'app/components/ui/MainContentContainer'
import { Flex, SPACING } from 'axelra-styled-bootstrap-grid'
import styled from 'styled-components'
import Spacer from 'app/components/ui/Spacer'
import { FILTER_HEIGHT, COLORS, OUTER_BORDER_RADIUS} from 'app/theme/theme'
import { MaxWidthFlex } from '../components/ui/MaxWidthFlex'

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

const Dashboard = () => {
  return (
    <FlexContainer column >
      <FilterContainer>This is the Filter Fam</FilterContainer>
      <MainContentContainer column>This is the dashboard page </MainContentContainer>
    </FlexContainer>
  )
}

export default Dashboard
