import { Platform } from 'react-native'
import { css } from 'styled-components/native'

export const onlyOnWeb = (cssString: string) =>
  Platform.select({
    ios: css``,
    android: css``,
    web: css`
      ${cssString}
    `,
  })
