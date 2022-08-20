import { ActionIcon, Button, Group, Space, Text, Title } from "@mantine/core"
import { IconBrandGithub, IconBrandInstagram, IconBrandTwitter, IconBrandWhatsapp } from "@tabler/icons"
import { useRouter } from "next/router"

const About = () => {
  const router = useRouter()

  const enterTestMode = () => {
    router.push('/test/notes')
  }

  return (
    <div>
      <Title order={3} style={{'marginBottom': '8px'}}>Welcome to my Notes Demo</Title>

      <Text>
        This is a small notes app I made using Next.js and Firebase as a demo to put on my portfolio. <br />
        Feel free to explore the app by either making an account or in test mode by using the button below.
        You can also view the source code for this project <Text variant="link" component="a" href="#">here</Text>.
      </Text>

      <Space h="xs" />

      <Group position="right">
        <Button 
        onClick={enterTestMode} 
        size="md" 
        radius="md" 
        variant="gradient" 
        gradient={{ from: 'blue', to: 'teal', deg: 60 }}>
          Explore in Test Mode
        </Button>
      </Group>

      <Space h="xl" />
      
      <Text>
        Also visit my <Text variant="link" component="a" href="#">portfolio</Text> to see more of my work along with 
        my social media using the links below:
      </Text>

      <Group spacing="xs">
        <ActionIcon size="lg" color="gray">
          <IconBrandGithub />
        </ActionIcon>

        <ActionIcon size="lg" color="green">
          <IconBrandWhatsapp />
        </ActionIcon>

        <ActionIcon size="lg" color="blue">
          <IconBrandTwitter />
        </ActionIcon>

        <ActionIcon size="lg" color="grape">
          <IconBrandInstagram />
        </ActionIcon>
      </Group>
    </div>
  )
}

export default About