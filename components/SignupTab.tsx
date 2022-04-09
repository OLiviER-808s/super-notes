import { Center, Input, Title, PasswordInput, Group, Button } from "@mantine/core"
import { IconAt, IconLock } from "@tabler/icons"

const SignupTab = () => {
  return (
    <form className="form">
      <Center>
        <Title order={3}>Create Account</Title>
      </Center>

      <Input icon={<IconAt />} variant="filled" placeholder="Email" />

      <PasswordInput icon={<IconLock />} variant="filled" placeholder="Password" />

      <PasswordInput icon={<IconLock />} variant="filled" placeholder="Confirm Password" />

      <Group position="center">
        <Button color="green">Enter</Button>
      </Group>
    </form>
  )
}

export default SignupTab