import { useAssets } from 'expo-asset'
import React, { useEffect } from 'react'
import { View } from 'react-native'
import { SvgUri } from 'react-native-svg'
import styled from 'styled-components'

const BackgroundWaveContainer = styled(View)`
  position: absolute;
`

const WavesSvg = () => {
  const [assets, error] = useAssets([require('../../../assets/svg/wave.svg')])

  useEffect(() => {
    if (error) console.log(error)
  }, [error])

  return (
    <BackgroundWaveContainer>
      {assets?.[0] && <SvgUri height={550} width={2000} uri={assets[0].uri} />}
    </BackgroundWaveContainer>
  )
}

export default WavesSvg
