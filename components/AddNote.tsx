import { Button, Group, Modal, Textarea, TextInput } from "@mantine/core"
import { useForm } from "@mantine/form"
import { IconMusic, IconNote, IconPhoto } from "@tabler/icons"
import { useState } from "react"
import { auth, db, timestamp } from "../lib/firebase"
import { useAuthState } from "react-firebase-hooks/auth";
import NoteModel from "../models/Note.model"
import { addDoc, collection } from "firebase/firestore"

const AddNote = () => {
  const [opened, setOpened] = useState(false)
  const [user] = useAuthState(auth)

  const form = useForm({
    initialValues: {
      title: '',
      content: ''
    }
  })

  const handleSubmit = async () => {
    if (form.values.title || form.values.content) {
      const note: NoteModel = {
        title: form.values.title,
        content: form.values.content,
        pinned: false,
        createdAt: timestamp(),
        uid: user?.uid
      }

      const ref = collection(db, 'notes')
      addDoc(ref, note)

      closeModal()
    }
  }

  const closeModal = () => {
    setOpened(false)
    form.reset()
  }

  return (
    <>
      <Modal opened={opened} onClose={closeModal} title="Create A New Note">
        <form className="form" onSubmit={form.onSubmit(handleSubmit)}>
          <TextInput placeholder="Note title" label="Title" autoFocus 
          {...form.getInputProps('title')}/>

          <Group position="center" spacing="xl">
            <Button variant="outline" radius="xl" size="xs" leftIcon={<IconPhoto />}>Add Image</Button>
            <Button variant="outline" radius="xl" size="xs" color="orange" leftIcon={<IconMusic />}>Add Audio</Button>
          </Group>

          <Textarea autosize minRows={5} placeholder="Your Content" label="Content"
          {...form.getInputProps('content')}/>

          <Group position="right" style={{'margin': '0'}}>
            <Button color="green" type="submit">Add Note</Button>
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