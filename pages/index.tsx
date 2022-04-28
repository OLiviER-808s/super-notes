import { ActionIcon, Button, Divider, Group, Paper, Tabs, useMantineColorScheme } from '@mantine/core'
import { IconBrandGithub, IconMoonStars, IconSun } from '@tabler/icons'
import { signInWithPopup } from 'firebase/auth'
import type { NextPage } from 'next'
import { useRouter } from 'next/router'
import { useEffect } from 'react'
import { useAuthState } from 'react-firebase-hooks/auth'
import LoginTab from '../components/LoginTab'
import SignupTab from '../components/SignupTab'
import { auth, googleProvider } from '../lib/firebase'

const Home: NextPage = () => {
  const router = useRouter()
  const [user] = useAuthState(auth)

  const { colorScheme, toggleColorScheme } = useMantineColorScheme()
  const dark = colorScheme === 'dark'

  const loginWithGoogle = async () => {
    await signInWithPopup(auth, googleProvider)
    router.push('/home')
  }

  useEffect(() => {
    if (user) router.push('/notes')
  }, [user])

  return (
    <div className='column'>
      <div style={{'marginBottom': '1.5em'}}>
        <Button onClick={loginWithGoogle} variant="outline" color="gray" leftIcon={<img src='google.svg'></img>}>
          Login With Google
        </Button>
      </div>

      <Paper shadow="md" p="md" withBorder style={{'width': '100%', 'maxWidth': '540px'}}>
        <Tabs tabPadding="md">
          <Tabs.Tab label="About">
            hello world
          </Tabs.Tab>
          <Tabs.Tab label="Signup">
            <SignupTab />
          </Tabs.Tab>
          <Tabs.Tab label="Login">
            <LoginTab />
          </Tabs.Tab>
        </Tabs>

        <Divider my="sm" />

        <Group spacing="xs">
          <ActionIcon size="sm" onClick={() => toggleColorScheme()}>
            {dark ? <IconSun /> : <IconMoonStars />}
          </ActionIcon>

          <ActionIcon size="sm">
            <IconBrandGithub />
          </ActionIcon>
        </Group>
      </Paper>
    </div>
  )
}

export default Home
