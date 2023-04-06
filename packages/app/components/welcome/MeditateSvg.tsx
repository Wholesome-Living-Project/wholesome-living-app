import { useAssets } from 'expo-asset'
import React, { useEffect } from 'react'
import { SvgUri } from 'react-native-svg'

const MeditateSvg = () => {
  const [assets, error] = useAssets([require('../../../assets/svg/meditate.svg')])

  useEffect(() => {
    if (error) console.log(error)
  }, [error])

  return assets?.[0] ? <SvgUri height={200} uri={assets[0].uri} /> : null
}

export default MeditateSvg
