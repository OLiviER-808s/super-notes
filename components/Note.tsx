import { ActionIcon, Button, Group, Modal, Paper, Text, Textarea, TextInput, Title } from "@mantine/core"
import { useForm } from "@mantine/form"
import { useHover } from "@mantine/hooks"
import { IconCheck, IconX } from "@tabler/icons"
import { useContext, useState } from "react"
import { editNote } from "../lib/auth"
import { NotesContext, SetNotesContext } from "../lib/NoteProvider"
import NoteModel from "../models/Note.model"

const Note = ({ note }: any) => {
  const [opened, setOpened] = useState(false)
  const { hovered, ref } = useHover()

  const form = useForm({
    initialValues: {
      title: note.title,
      content: note.content
    }
  })

  const notes = useContext(NotesContext)
  const setNotes = useContext(SetNotesContext)

  const toggleSelect = () => {
    setNotes(notes.map((n: NoteModel) => {
      if (n.id === note.id) return { ...note, selected: !note.selected }
      else return n
    }))
  }

  const clickNote = () => {
    if (notes.filter((n: NoteModel) => n.selected).length === 0) setOpened(true)
    else toggleSelect()
  }

  const handleEdit = () => {
    if (form.values.title !== note.title || form.values.content !== note.content) {
      const data = { ...note, title: form.values.title, content: form.values.content }

      editNote(data)
    }
    setOpened(false)
  }

  return (
    <div className={`note ${note.selected ? 'selected' : null}`} ref={ref}>
      <Modal opened={opened} onClose={() => setOpened(false)} title="Note">
        <form className="form" onSubmit={form.onSubmit(handleEdit)}>
          <TextInput placeholder="Title" autoFocus 
          {...form.getInputProps('title')}/>

          <Textarea placeholder="Content" minRows={8} autosize maxRows={18}
          {...form.getInputProps('content')}/>

          <Group position="right" style={{'margin': 0}}>
            <Button color="green" type="submit">Edit</Button>
          </Group>
        </form>
      </Modal>

      <Paper shadow="xs" radius="md" p="md" withBorder
      style={{'backgroundColor': note.color || null}}>
        <div onClick={clickNote}>
          <Title order={4}>{ note.title }</Title>
          <Text lineClamp={12}>{ note.content }</Text>
        </div>
        
        {hovered && (
          <Group position="right" spacing="xs">
            <ActionIcon color="blue" size="sm" variant="filled" onClick={toggleSelect}>
              {note.selected ? <IconX /> : <IconCheck />}
            </ActionIcon>
          </Group>
        )}
      </Paper>
    </div>
  )
}

export default Note