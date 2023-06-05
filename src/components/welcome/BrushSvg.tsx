import { useAssets } from 'expo-asset'
import React, { useEffect } from 'react'
import { SvgUri } from 'react-native-svg'

const BrushSvg = () => {
  const [assets, error] = useAssets([require('../../../assets/svg/brush-stroke.svg')])

  useEffect(() => {
    if (error) console.log(error)
  }, [error])

  return assets?.[0] ? <SvgUri width={500} height={300} uri={assets[0].uri} /> : null
}

export default BrushSvg
