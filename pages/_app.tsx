import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { ColorScheme, ColorSchemeProvider, Global, MantineProvider } from '@mantine/core'
import { useHotkeys, useLocalStorage } from '@mantine/hooks'
import NoteListProvider from '../providers/NoteProvider'
import PathProvider from '../providers/PathProvider'
import Head from 'next/head'
import OverlayProvider from '../providers/OverlayProvider'
import { useEffect } from 'react'
import { Workbox } from 'workbox-window'
import AudioProvider from '../providers/AudioProvider'

function MyApp({ Component, pageProps }: AppProps) {
  const [colorScheme, setColorScheme] = useLocalStorage<ColorScheme>({
    key: 'color-scheme',
    defaultValue: 'light',
    getInitialValueInEffect: true
  })

  const toggleColorScheme = (value?: ColorScheme) => {
    setColorScheme(value || (colorScheme === 'dark' ? 'light' : 'dark'))
  }

  useHotkeys([['mod+J', () => toggleColorScheme()]])

  useEffect(() => {
    if (!("serviceWorker" in navigator) || process.env.NODE_ENV !== "production") {
      console.warn("Progressive Web App support is disabled")
      return
    }

    const wb = new Workbox("sw.js", { scope: "/" })
    wb.register();
  }, [])

  return (
    <ColorSchemeProvider colorScheme={colorScheme} toggleColorScheme={toggleColorScheme}>
      <MantineProvider theme={{ colorScheme }} withGlobalStyles>
        <Head>
          <title>Notes Demo</title>
        </Head>

        <Global styles={(theme) => ({
          body: {
            ...theme.fn.fontStyles(),
            backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[5] : theme.colors.gray[3],
            color: theme.colorScheme === 'dark' ? theme.colors.dark[0] : theme.black,
            lineHeight: theme.lineHeight
          }
        })} />

        <AudioProvider>
          <PathProvider>
            <NoteListProvider>
              <OverlayProvider>
                <Component {...pageProps} />
              </OverlayProvider>
            </NoteListProvider>
          </PathProvider>
        </AudioProvider>
      </MantineProvider>
    </ColorSchemeProvider>
  )
}

export default MyApp
