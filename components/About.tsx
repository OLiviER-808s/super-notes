import { ActionIcon, Button, Group, Space, Text, Title } from "@mantine/core"
import { IconBrandGithub, IconBrandInstagram, IconBrandTwitter, IconBrandWhatsapp } from "@tabler/icons"
import Link from "next/link"

const About = () => {
  return (
    <div>
      <Title order={2} style={{'marginBottom': '8px'}}>Notes Demo by OLiviER</Title>

      <Space h="xs" />

      <Text>
        This is a notes app I made using Next.js and Firebase as a demo to showcase my web development and design skills. <br />
        Feel free to explore the app by signing up with google or use a fake email in the signup tab. Also check out my
        full portfolio using the button bellow:
      </Text>

      <Space h="xs" />

      <Group position="right">
        <Link href="https://www.upwork.com/freelancers/~01dd09c3a20dad7abc">
          <Button 
          size="md" 
          variant="gradient" 
          gradient={{ from: '#f28e26', to: '#fd644f', deg: 90 }}>
            View my Portflio
          </Button>
        </Link>
      </Group>

      <Space h="xl" />
      
      <Text>Also check out my social media using the links below:</Text>

      <Group spacing="xs">
        <Link href="https://github.com/OLiviER-808s">
          <ActionIcon size="lg" color="gray">
            <IconBrandGithub />
          </ActionIcon>
        </Link>

        <Link href="#">
          <ActionIcon size="lg" color="green">
            <IconBrandWhatsapp />
          </ActionIcon>
        </Link>

        <Link href="https://twitter.com/olivier808s">
          <ActionIcon size="lg" color="blue">
            <IconBrandTwitter />
          </ActionIcon>
        </Link>

        <Link href="https://www.instagram.com/olivier808s/">
          <ActionIcon size="lg" color="grape">
            <IconBrandInstagram />
          </ActionIcon>
        </Link>
      </Group>
    </div>
  )
}

export default About