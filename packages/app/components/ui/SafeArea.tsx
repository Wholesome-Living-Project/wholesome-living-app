import SafeAreaViewFixed from 'app/components/ui/SafeAreaViewFixed'
import { COLORS, SPACING } from 'app/theme/theme'
import React, { PropsWithChildren } from 'react'
import { View } from 'react-native'
import styled from 'styled-components'
import BackButton from 'wholesome-living-app/components/BackButton'

const Background = styled(SafeAreaViewFixed)`
  background: ${COLORS.GREY};
  flex: 1;
`

const BackButtonContainer = styled(View)`
  position: relative;
  top: 0;
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  padding: ${SPACING / 2}px ${SPACING * 2.5}px;
`

type Props = { showBack?: boolean } & PropsWithChildren
export const SafeArea = ({ showBack, children }: Props) => {
  return (
    <Background>
      {showBack && (
        <BackButtonContainer>
          <BackButton />
        </BackButtonContainer>
      )}
      {children}
    </Background>
  )
}
