import '@/styles/globals.css'
import { ChakraProvider, cookieStorageManager } from '@chakra-ui/react'
import type { AppProps } from 'next/app'
import Layout from '../components/layouts/Layout'
import theme from '../lib/theme'

export default function App({ Component, pageProps, router }: AppProps) {
  return (
    <ChakraProvider theme={theme} colorModeManager={cookieStorageManager}>
      <Layout router={router}>
        <Component {...pageProps} key={router.route} />
      </Layout>
    </ChakraProvider>
  )
}
