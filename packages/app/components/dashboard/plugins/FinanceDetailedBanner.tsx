import PluginDetailedBanner from 'app/components/dashboard/PluginDetailedBanner'
import { plugins } from 'app/helpers/pluginList'
import { useFinance } from 'app/provider/FinanceContentProvider'
import { COLORS } from 'app/theme/theme'
import { Regular } from 'app/theme/typography'
import React, { useMemo } from 'react'
import { Text, View } from 'react-native'
import styled from 'styled-components'

const Wrapper = styled(View)`
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
`

const Content = () => {
  const { spendings } = useFinance()

  const calcSpendings = useMemo(() => {
    let dailySpendings = 0
    spendings.forEach((spending) => (dailySpendings += spending.amount))
    return dailySpendings
  }, [spendings])

  return (
    <Wrapper>
      <Regular color={COLORS.WHITE}>Saved this month</Regular>
      <Text style={{ fontSize: 55, color: COLORS.WHITE, fontWeight: '600' }}>
        {calcSpendings + '.-'}
      </Text>
    </Wrapper>
  )
}

const FinanceDetailedBanner = () => {
  return (
    <PluginDetailedBanner
      content={<Content />}
      plugin={plugins.FINANCE}
      backgroundImage={require('../../../../assets/images/man_saving_money.jpg')}
    />
  )
}

export default FinanceDetailedBanner
