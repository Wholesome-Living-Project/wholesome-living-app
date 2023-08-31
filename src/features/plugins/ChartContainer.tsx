import { alpha } from 'axelra-react-native-utilities'
import React, { PropsWithChildren, ReactNode } from 'react'
import styled from 'styled-components'
import { Flex } from '../../components/ui/Flex'
import Spacer from '../../components/ui/Spacer'
import { COLORS, INNER_BORDER_RADIUS, SPACING } from '../../theme/theme'
import { Caption, Heading6, Light } from '../../theme/typography'

const Container = styled(Flex)`
  border-radius: ${INNER_BORDER_RADIUS}px;
  border: 1px solid ${COLORS.GREY};
  padding: ${SPACING * 1.2}px;
`

const ChartIconBorder = styled(Flex)`
  border-radius: 50px;
  height: 40px;
  width: 40px;
  background: ${alpha(0.1, COLORS.DARK_GREY)};
  padding: ${SPACING / 2}px;
`

type Props = {
  title: string
  chartType: string
  description?: string
  icon: ReactNode
} & PropsWithChildren

const ChartContainer = ({ chartType, icon, title, description, children }: Props) => {
  return (
    <Container>
      <Flex>
        <Flex row align={'center'}>
          <ChartIconBorder row justify={'center'} align={'center'}>
            {icon}
          </ChartIconBorder>
          <Spacer x={1} />
          <Flex>
            <Caption margin={false} color={COLORS.DARK_GREY}>
              {chartType}
            </Caption>
            <Heading6 margin={false}>{title}</Heading6>
          </Flex>
        </Flex>
        <Spacer x={1} />
        <Light color={COLORS.DARK_GREY}>{description}</Light>
      </Flex>
      <Spacer x={2} />
      {children}
    </Container>
  )
}

export default ChartContainer
