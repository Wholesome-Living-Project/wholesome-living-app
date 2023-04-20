import 'raf/polyfill'

const fixReanimatedIssue = () => {
  if (process.browser) {
    // @ts-ignore
    window._frameTimestamp = null
  }
}

fixReanimatedIssue()

import Providers from 'app/provider/Providers'
import Head from 'next/head'
import type { SolitoAppProps } from 'solito'
import { ThemeProvider } from 'styled-components'
import Background from '../../../../packages/app/components/ui/Background'
import Header from '../components/layout/Header'
import SideBar from '../components/layout/SideBar'
import { MAIN_THEME } from '../theme/makeTheme'
import { GlobalStyle } from '../theme/theme'
import styled from 'styled-components'
import { SIDEBAR_WIDTH } from 'app/theme/theme'
import { MOBILE_SIDEBAR_HEIGHT } from 'app/theme/theme'
import { SPACING } from 'axelra-styled-bootstrap-grid'
import { MaxWidthContainer } from '../components/ui/MaxWidthContainer'
import Spacer from 'app/components/ui/Spacer'
import { Flex } from 'axelra-styled-bootstrap-grid'



const SideBarPadder = styled(Flex)`
  width: 100%;
  position: absolute;
  height: 100%;
  padding-top: ${MOBILE_SIDEBAR_HEIGHT}px;
  margin-top: ${SPACING * 2}px;
  margin-left: -${SPACING*2}px;


  @media only screen and (min-width: ${(p) => p.theme.breakPoints.sm}px) {
    padding-left: ${SIDEBAR_WIDTH}px;
    padding-top: 0px;
    margin-top: 0px;
    margin-left: ${SPACING*2}px;
  }
`

const MaxWidthContainerPadder = styled(MaxWidthContainer)`
  position: relative;
  height: 100%;
  `


function MyApp({ Component, pageProps }: SolitoAppProps) {
  return (
    <>
      <Head>
        <title>Wholesome Living</title>
        <meta name="description" content="Wholesome Living" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <GlobalStyle />
      <ThemeProvider theme={MAIN_THEME}>
        <Providers>
          <Header />
          <Background>
            <MaxWidthContainerPadder row>
          <SideBar />
          <SideBarPadder column>
            <Component {...pageProps} />
            <Spacer x={2}/>
          </SideBarPadder>
          </MaxWidthContainerPadder>
          </Background>
        </Providers>
      </ThemeProvider>
    </>
  )
}

export default MyApp
