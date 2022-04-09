import { ActionIcon, Button, Divider, Group, Paper, Tabs } from '@mantine/core'
import { IconBrandGithub, IconMoon } from '@tabler/icons'
import type { NextPage } from 'next'
import LoginTab from '../components/LoginTab'
import SignupTab from '../components/SignupTab'

const Home: NextPage = () => {
  return (
    <div className='column'>
      <div style={{'marginBottom': '1.5em'}}>
        <Button variant="outline" color="gray" leftIcon={<img src='google.svg'></img>}>
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
          <ActionIcon size="sm">
            <IconMoon />
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
