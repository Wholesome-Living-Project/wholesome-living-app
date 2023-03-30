import { onlyOnWeb } from 'app/helpers/onlyOnWeb'
import styled from 'styled-components/native'

export const ComponentWidthWeb = styled.View<{ maxWidthWeb: number }>`
  ${(p) =>
    onlyOnWeb(`
        max-width: ${p.maxWidthWeb}px;
      `)}
`
