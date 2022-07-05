import { Button, Center, Group, LoadingOverlay, PasswordInput, Text, TextInput, Title } from "@mantine/core"
import { useForm } from "@mantine/form"
import { IconAt, IconLock } from "@tabler/icons"
import { signInWithEmailAndPassword } from "firebase/auth"
import { useRouter } from "next/router"
import { useState } from "react"
import { auth } from "../lib/firebase"

const LoginTab = () => {
  const form = useForm({
    initialValues: {
      email: '',
      password: ''
    }
  })

  const [error, setError]: any = useState('')
  const [loading, setLoading] = useState(false)

  const router = useRouter()

  const handleSubmit = async () => {
    try {
      setError('')
      setLoading(true)

      await signInWithEmailAndPassword(auth, form.values.email, form.values.password)

      router.push('/notes')
    } catch (error) {
      setError('Email or Password is incorrect')
    }
    setLoading(false)
  }

  return (
    <form className="form" onSubmit={form.onSubmit(handleSubmit)}>
      <LoadingOverlay visible={loading} />

      <TextInput icon={<IconAt />} variant="filled" placeholder="Your email" 
      label="Email" required
      {...form.getInputProps('email')}/>

      <PasswordInput icon={<IconLock />} variant="filled" placeholder="Your password"
      label="Password" required
      {...form.getInputProps('password')} />

      {error && (
        <Center>
          <Text color="red" size="sm">{ error }</Text>
        </Center>
      )}

      <Group position="right">
        <Button variant="subtle" color="cyan">Forgot Password?</Button>
        <Button color="indigo" type="submit">Login</Button>
      </Group>
    </form>
  )
}

export default LoginTab