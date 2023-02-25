import { Platform } from 'react-native'
import { css } from 'styled-components/native'

export const onlyOnMobile = (cssString: string) =>
  Platform.select({
    ios: css`
      ${cssString}
    `,
    android: css`
      ${cssString}
    `,
    web: css``,
  })
