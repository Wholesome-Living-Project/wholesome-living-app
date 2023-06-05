import React from 'react'
import { Image } from 'react-native'
import styled from 'styled-components'
export const SEED_SIZE = 70
export const SPROUT_SIZE = 80
export const SAPLING_SIZE = 120
export const SMALL_SIZE = 130
export const MIDDLE_SIZE = 150
export const BIG_SIZE = 170

export const Seed = styled(Image)`
  height: ${SEED_SIZE}px;
  width: ${SEED_SIZE}px;
  top: 15px;
`

export const Sprout = styled(Image)`
  height: ${SPROUT_SIZE}px;
  width: ${SPROUT_SIZE}px;
  top: 10px;
`

export const Sapling = styled(Image)`
  height: ${SAPLING_SIZE}px;
  width: ${SAPLING_SIZE}px;
  top: 15px;
`

export const Small = styled(Image)`
  height: ${SMALL_SIZE}px;
  width: ${SMALL_SIZE}px;
  top: 20px;
`

export const Middle = styled(Image)`
  height: ${MIDDLE_SIZE}px;
  width: ${MIDDLE_SIZE}px;
  top: 25px;
`

export const Big = styled(Image)`
  height: ${BIG_SIZE}px;
  width: ${BIG_SIZE}px;
  top: 12px;
`

export const Background = styled(Image)`
  position: absolute;
  width: 100%;
  height: 100%;
`

export const levelComponents = [
  <Seed source={require('../../../assets/images/levels_raw/seed.png')} />,
  <Sprout source={require('../../../assets/images/levels_raw/sprout.png')} />,
  <Sapling source={require('../../../assets/images/levels_raw/sapling.png')} />,
  <Small source={require('../../../assets/images/levels_raw/small.png')} />,
  <Middle source={require('../../../assets/images/levels_raw/middle.png')} />,
  <Big source={require('../../../assets/images/levels_raw/big.png')} />,
]
