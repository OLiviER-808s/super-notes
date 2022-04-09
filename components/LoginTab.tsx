import { Button, Center, Group, PasswordInput, TextInput, Title } from "@mantine/core"
import { IconAt, IconLock } from "@tabler/icons"

const LoginTab = () => {

  return (
    <form className="form">
      <Center>
        <Title order={3}>Login</Title>
      </Center>

      <TextInput icon={<IconAt />} variant="filled" placeholder="Email"/>

      <PasswordInput icon={<IconLock />} variant="filled" placeholder="Password" />

      <Group position="center">
        <Button color="indigo">Enter</Button>
        <Button variant="subtle" color="cyan">Forgot Password?</Button>
      </Group>
    </form>
  )
}

export default LoginTab