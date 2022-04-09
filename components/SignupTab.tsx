import { Center, Title, PasswordInput, Group, Button, TextInput } from "@mantine/core"
import { useInputState } from "@mantine/hooks"
import { IconAt, IconLock } from "@tabler/icons"

const SignupTab = () => {
  const [email, setEmail] = useInputState('')
  const [password, setPassword] = useInputState('')
  const [passwordConfirm, setPasswordConfirm] = useInputState('')



  return (
    <form className="form">
      <Center>
        <Title order={3}>Create Account</Title>
      </Center>

      <TextInput icon={<IconAt />} variant="filled" placeholder="Email"
      value={email} onChange={setEmail} />

      <PasswordInput icon={<IconLock />} variant="filled" placeholder="Password"
      value={password} onChange={setPassword} />

      <PasswordInput icon={<IconLock />} variant="filled" placeholder="Confirm Password"
      value={passwordConfirm} onChange={setPasswordConfirm} />

      <Group position="center">
        <Button color="green" type="submit">Enter</Button>
      </Group>
    </form>
  )
}

export default SignupTab