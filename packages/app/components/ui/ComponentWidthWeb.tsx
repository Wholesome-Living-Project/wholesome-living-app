import { onlyOnWeb } from 'app/helpers/onlyOnWeb'
import styled from 'styled-components/native'

export const ComponentWidthWeb = styled.View<{ maxWidth: number }>`
  ${(p) =>
    onlyOnWeb(`
        max-width: ${p.maxWidth}px;
      `)}
`
