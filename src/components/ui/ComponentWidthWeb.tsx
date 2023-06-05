import styled from 'styled-components/native'
import { onlyOnWeb } from '../../helpers/onlyOnWeb'

export const ComponentWidthWeb = styled.View<{ maxWidthWeb: number }>`
  ${(p) =>
    onlyOnWeb(`
        max-width: ${p.maxWidthWeb}px;
      `)}
`
