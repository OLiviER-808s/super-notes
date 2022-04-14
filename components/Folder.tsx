import { ActionIcon, Center, Paper, Stack, Title } from "@mantine/core"
import { IconFolder } from "@tabler/icons"

const Folder = ({ folder }: any) => {
  return (
    <>
      <Paper shadow="xs" radius="md" p="md" withBorder>
        <Stack align="center" spacing="sm">
          <ActionIcon size={48}>
            <IconFolder size={48}></IconFolder>
          </ActionIcon>

          <Title order={4}>{ folder.name }</Title>
        </Stack>
      </Paper>
    </>
  )
}

export default Folder