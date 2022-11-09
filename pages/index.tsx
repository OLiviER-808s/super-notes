import { Button, Paper, Tabs } from '@mantine/core'
import { signInWithPopup } from 'firebase/auth'
import type { NextPage } from 'next'
import { useRouter } from 'next/router'
import { useEffect } from 'react'
import { useAuthState } from 'react-firebase-hooks/auth'
import About from '../components/About'
import LoginTab from '../components/LoginTab'
import SignupTab from '../components/SignupTab'
import { auth, googleProvider } from '../lib/firebase'

const Home: NextPage = () => {
  const router = useRouter()
  const [user] = useAuthState(auth)

  const loginWithGoogle = async () => {
    await signInWithPopup(auth, googleProvider)
    router.push('/notes')
  }

  useEffect(() => {
    if (user) router.push('/notes')
  }, [user])

  return (
    <div className='column'>
      <Button my="xl" onClick={loginWithGoogle} variant="outline" color="gray" leftIcon={<img src='google.svg'></img>}>
        Login With Google
      </Button>

      <Paper shadow="md" p="md" withBorder style={{'width': '100%', 'maxWidth': '540px'}}>
        <Tabs defaultValue="about" variant="pills">
          <Tabs.List>
            <Tabs.Tab value="about">Home</Tabs.Tab>
            <Tabs.Tab value="signup">Signup</Tabs.Tab>
            <Tabs.Tab value="login">Login</Tabs.Tab>
          </Tabs.List>

          <Tabs.Panel value="about" pt="sm">
            <About />
          </Tabs.Panel>

          <Tabs.Panel value="signup" pt="sm">
            <SignupTab />
          </Tabs.Panel>

          <Tabs.Panel value="login" pt="sm">
            <LoginTab />
          </Tabs.Panel>
        </Tabs>
      </Paper>
    </div>
  )
}

export default Home
