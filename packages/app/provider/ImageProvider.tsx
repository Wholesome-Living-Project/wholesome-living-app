import React, { PropsWithChildren } from 'react'
import { View } from 'react-native'

const ImageProvider = ({ children }: PropsWithChildren) => {
  return <View>{children}</View>
}

export default ImageProvider
