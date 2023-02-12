import 'raf/polyfill'

const fixReanimatedIssue = () => {
  if (process.browser) {
    // @ts-ignore
    window._frameTimestamp = null
  }
}

fixReanimatedIssue()

import { Provider } from 'app/provider'
import Head from 'next/head'
import type { SolitoAppProps } from 'solito'
import { ThemeProvider } from 'styled-components'
import Header from '../components/layout/Header'
import { MAIN_THEME } from '../theme/makeTheme'
import { GlobalStyle } from '../theme/theme'

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
        <Provider>
          <Header />
          <Component {...pageProps} />
        </Provider>
      </ThemeProvider>
    </>
  )
}

export default MyApp
