import { Button, Group, Modal, Textarea, TextInput } from "@mantine/core"
import { IconMusic, IconNote, IconPhoto } from "@tabler/icons"
import { useState } from "react"

const AddNote = () => {
  const [opened, setOpened] = useState(false)

  return (
    <>
      <Modal opened={opened} onClose={() => setOpened(false)} title="Create A New Note">
        <form className="form">
          <TextInput placeholder="Note title" label="Title"/>

          <Group position="center" spacing="xl">
            <Button variant="outline" radius="xl" size="xs" leftIcon={<IconPhoto />}>Add Image</Button>
            <Button variant="outline" radius="xl" size="xs" color="orange" leftIcon={<IconMusic />}>Add Audio</Button>
          </Group>

          <Textarea autosize minRows={5} placeholder="Your Content" label="Content"/>

          <Group position="right" style={{'margin': '0'}}>
            <Button variant="light">Cancel</Button>
            <Button color="green">Add Note</Button>
          </Group>
        </form>
      </Modal>
  
      <Button color="green" size="md" leftIcon={<IconNote />} onClick={() => setOpened(true)}>
        Add Note
      </Button>
    </>
  )
}

export default AddNote