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


const SideBarPadder = styled.div`
  width: 100%;
  position: relative;
  height: 100%;
  padding-top: ${MOBILE_SIDEBAR_HEIGHT}px;

  @media only screen and (min-width: ${(p) => p.theme.breakPoints.sm}px) {
    padding-left: ${SIDEBAR_WIDTH}px;
  }

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
          <SideBar />
          <SideBarPadder>
            <Component {...pageProps} />
          </SideBarPadder>
          </Background>
        </Providers>
      </ThemeProvider>
    </>
  )
}

export default MyApp
