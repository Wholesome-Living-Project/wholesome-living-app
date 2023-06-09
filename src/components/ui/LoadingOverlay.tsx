import React, { PropsWithChildren, useEffect, useState } from 'react'
import { ActivityIndicator } from 'react-native'
import styled from 'styled-components'
import { useWindowDimensions } from '../../hooks/useWindowDimensions'
import { COLORS } from '../../theme/theme'
import { Flex } from './Flex'

const LoadingBackground = styled(Flex)`
  background: ${COLORS.WHITE};
  position: absolute;
  width: 100%;
  height: 100%;
`

const Container = styled(Flex)`
  position: absolute;
  z-index: 999;
`

type Props = {
  loadFor: number
} & PropsWithChildren

// Use this to wrap screens that need to load in the background
const LoadingOverlay = ({ children, loadFor }: Props) => {
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    setTimeout(() => {
      setLoading(false)
    }, loadFor)
  }, [loadFor])

  return (
    <>
      {children}
      <LoadingScreen show={loading} />
    </>
  )
}

type LoadingProps = { show: boolean }
const LoadingScreen = ({ show }: LoadingProps) => {
  const { windowHeight, windowWidth } = useWindowDimensions()

  if (show)
    return (
      <Container
        row
        justify={'center'}
        align={'center'}
        style={{ width: windowWidth, height: windowHeight }}>
        <LoadingBackground />
        <ActivityIndicator color={COLORS.PRIMARY} />
      </Container>
    )
  return null
}

export default LoadingOverlay
