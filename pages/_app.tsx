import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { Box, Global, MantineProvider } from '@mantine/core'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <MantineProvider theme={{ colorScheme: 'light' }} withGlobalStyles>
      <Global styles={(theme) => ({
        body: {
          ...theme.fn.fontStyles(),
          backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[6] : theme.colors.gray[3],
          color: theme.colorScheme === 'dark' ? theme.colors.dark[0] : theme.black,
          lineHeight: theme.lineHeight
        }
      })} />

      <Component {...pageProps} />
    </MantineProvider>
  )
}

export default MyApp
