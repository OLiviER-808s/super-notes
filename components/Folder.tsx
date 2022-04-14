import { ActionIcon, Center, Paper, Stack, Title } from "@mantine/core"
import { IconFolder } from "@tabler/icons"
import { useContext } from "react"
import { SetPathContext } from "../lib/PathProvider"

const Folder = ({ folder }: any) => {
  const setPath = useContext(SetPathContext)

  return (
    <>
      <Paper shadow="xs" radius="md" p="md" withBorder>
        <Stack align="center" spacing="sm">
          <ActionIcon size={48} onClick={() => setPath((path: string) => path + `/${folder.name}`)}>
            <IconFolder size={48}></IconFolder>
          </ActionIcon>

          <Title order={4}>{ folder.name }</Title>
        </Stack>
      </Paper>
    </>
  )
}

export default Folder