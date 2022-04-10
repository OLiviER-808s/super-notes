import { ActionIcon, Button, Center, Group } from "@mantine/core"
import { IconFolderPlus, IconNote, IconSettings } from "@tabler/icons"
import AddNote from "./AddNote"

const Toolbar = () => {
  return (
    <Center>
      <div style={{'maxWidth': '840px', 'width': '100%'}}>
        <Group spacing="xs">
          <AddNote />

          <ActionIcon color="blue" size="xl" variant="light">
            <IconFolderPlus />
          </ActionIcon>

          <div className="spacer"></div>

          <ActionIcon size="xl">
            <IconSettings />
          </ActionIcon>
        </Group>
      </div>
    </Center>
  )
}

export default Toolbar