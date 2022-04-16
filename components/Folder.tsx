import { ActionIcon, Button, Group, Modal, Paper, Stack, Text, Title } from "@mantine/core"
import { useHover, useViewportSize } from "@mantine/hooks"
import { IconFolder, IconTrash } from "@tabler/icons"
import { useContext, useState } from "react"
import { deleteFolder } from "../lib/auth"
import { SetPathContext } from "../lib/PathProvider"

const Folder = ({ folder }: any) => {
  const setPath = useContext(SetPathContext)
  const [opened, setOpened] = useState(false)

  const { ref, hovered } = useHover()
  const { width } = useViewportSize()

  const handleDelete = (e: any) => {
    e.preventDefault()
    deleteFolder(folder.id)
    
    setOpened(false)
  }

  return (
    <>
      <Modal opened={opened} onClose={() => setOpened(false)} title="Delete Folder">
        <Title order={4}>Are you sure you want to delete this folder?</Title>
        <Text>The content inisde will also be deleted.</Text>

        <Group position="right" style={{'marginTop': '1em'}}>
          <Button color="red" onClick={handleDelete}>Delete</Button>
        </Group>
      </Modal>

      <Paper shadow="xs" radius="md" p="md" withBorder ref={ref}>
        <Stack align="center" spacing="sm">
          <ActionIcon size={48} onClick={() => setPath((path: string) => path + `/${folder.name}`)}>
            <IconFolder size={48}></IconFolder>
          </ActionIcon>

          <Title order={4}>{ folder.name }</Title>
        </Stack>
        
        {(hovered || width < 800) && (
          <Group position="right">
            <ActionIcon color="red" size="sm" onClick={() => setOpened(true)}>
              <IconTrash />
            </ActionIcon>
          </Group>
        )}
      </Paper>
    </>
  )
}

export default Folder