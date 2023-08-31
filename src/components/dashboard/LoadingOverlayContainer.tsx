import { alpha } from 'axelra-react-native-utilities'
import React, { createContext, useContext, useState } from 'react'
import { ActivityIndicator } from 'react-native'
import styled from 'styled-components'
import { COLORS } from '../../theme/theme'
import { Flex } from '../ui/Flex'

const Overlay = styled(Flex)`
  width: 100%;
  height: 100%;
  background: ${alpha(0.5, COLORS.BLACK)};
  z-index: 100;
  position: absolute;
`

type LoadingOverlayType = { loading: boolean; setLoading: (st: boolean) => void }
const LoadingOverlayContext = createContext<LoadingOverlayType>({} as LoadingOverlayType)

export const useLoadingOverlay = () => useContext(LoadingOverlayContext)

type Props = {
  children: React.ReactNode
}
const LoadingOverlayContainer = ({ children }: Props) => {
  const [loading, setLoading] = useState(false)
  return (
    <LoadingOverlayContext.Provider value={{ loading, setLoading }}>
      {children}
      {loading && (
        <Overlay row justify={'center'} align={'center'}>
          <ActivityIndicator />
        </Overlay>
      )}
    </LoadingOverlayContext.Provider>
  )
}

export default LoadingOverlayContainer
