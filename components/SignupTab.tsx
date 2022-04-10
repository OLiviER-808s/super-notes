import { Center, Title, PasswordInput, Group, Button, TextInput, LoadingOverlay } from "@mantine/core"
import { useForm } from "@mantine/form"
import { IconAt, IconLock } from "@tabler/icons"
import { createUserWithEmailAndPassword } from "firebase/auth"
import { useRouter } from "next/router"
import { useState } from "react"
import { auth } from "../lib/firebase"

const SignupTab = () => {
  const form = useForm({
    initialValues: {
      email: '',
      password: '',
      passwordConfirm: ''
    },
    validate: {
      email: (value) => (/^\S+@\S+$/.test(value) ? null : 'Invalid email'),
      password: (value) => (value.length > 6 ? null : 'Password is too short'),
      passwordConfirm: (value, values) => (value === values.password ? null : "Password doesn't match")
    }
  })

  const [loading, setLoading] = useState(false)

  const router = useRouter()

  const handleSubmit = async () => {
    setLoading(true)

    await createUserWithEmailAndPassword(auth, form.values.email, form.values.password)

    router.push('/home')
    setLoading(false)
  }

  return (
    <form className="form" onSubmit={form.onSubmit(handleSubmit)}>
      <LoadingOverlay visible={loading} />

      <Center>
        <Title order={3}>Create Account</Title>
      </Center>

      <TextInput icon={<IconAt />} variant="filled" placeholder="Email" 
      {...form.getInputProps('email')}/>

      <PasswordInput icon={<IconLock />} variant="filled" placeholder="Password" 
      {...form.getInputProps('password')}/>

      <PasswordInput icon={<IconLock />} variant="filled" placeholder="Confirm Password" 
      {...form.getInputProps('passwordConfirm')}/>

      <Group position="center">
        <Button color="green" type="submit">Enter</Button>
      </Group>
    </form>
  )
}

export default SignupTab