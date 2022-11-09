import { Button, Center, Group, LoadingOverlay, Paper, Text, TextInput, Title } from "@mantine/core"
import { useForm } from "@mantine/form"
import { IconAt } from "@tabler/icons"
import { sendPasswordResetEmail } from "firebase/auth"
import { NextPage } from "next"
import Link from "next/link"
import { useState } from "react"
import { auth } from "../lib/firebase"

const Home: NextPage = () => {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [emailSent, setEmailSent] = useState(false)

  const form = useForm({
    initialValues: {
      email: ''
    }
  })

  const onSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)

    if (!/^\S+@\S+$/.test(form.values.email)) return setError('Email not found')

    try {
      await sendPasswordResetEmail(auth, form.values.email)
      setEmailSent(true)
    } catch (error) {
      setError('Email not found')
    }

    setLoading(false)
  }

  return (
    <div className="column">
      <Paper shadow="md" p="md" my="xl" withBorder style={{'width': '100%', 'maxWidth': '540px'}}>
        <Title order={4} mb="md">Forgot Password?</Title>

        {!emailSent ? (
          <form onSubmit={onSubmit} className="form">
            <LoadingOverlay visible={loading} />

            <TextInput icon={<IconAt />} variant="filled" placeholder="Your email" 
            label="Email" required {...form.getInputProps('email')}/>

            {error && (
              <Center>
                <Text color="red" size="sm">{ error }</Text>
              </Center>
            )}

            <Group position="right">
              <Link href="/">
                <Button variant="subtle" type="button" color="cyan">Back</Button>
              </Link>

              <Button color="blue" type="submit">Send Reset Email</Button>
            </Group>
          </form>
        ) : (
          <div>
            <Title order={4} mb="md">Email Sent</Title>

            <Link href="/">
              <Center>
                <Button color="blue" type="submit">Login</Button>
              </Center>
            </Link>
          </div>
        )}
      </Paper>
    </div>
  )
}

export default Home