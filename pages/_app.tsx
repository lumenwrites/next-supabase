import '../styles/style.scss'

import CombinedContextsProvider from 'context/CombinedContexts'

function MyApp({ Component, pageProps }) {
  return (
    <CombinedContextsProvider>
      <Component {...pageProps} />
    </CombinedContextsProvider>
  )
}

export default MyApp
