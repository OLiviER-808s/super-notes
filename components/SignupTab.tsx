import { PasswordInput, Group, Button, TextInput, LoadingOverlay } from "@mantine/core"
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

    router.push('/notes')
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
      {...form.getInputProps('password')}/>

      <PasswordInput icon={<IconLock />} variant="filled" placeholder="Confirm your password" 
      label="Confirm Password" required
      {...form.getInputProps('passwordConfirm')}/>

      <Group position="right">
        <Button color="green" type="submit">Create Account</Button>
      </Group>
    </form>
  )
}

export default SignupTab