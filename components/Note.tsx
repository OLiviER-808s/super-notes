import { ActionIcon, Button, Center, Code, Group, LoadingOverlay, Modal, Paper, Text, Textarea, TextInput, Title } from "@mantine/core"
import { useForm } from "@mantine/form"
import { useHover, useViewportSize } from "@mantine/hooks"
import { IconCheck, IconMusic, IconPhoto, IconX } from "@tabler/icons"
import { useContext, useRef, useState } from "react"
import useLongPress from "../hooks/useLongPress"
import { editNote, uploadAudio, uploadImage } from "../lib/auth"
import { NotesContext, SetNotesContext } from "../lib/NoteProvider"
import NoteModel from "../models/Note.model"

const Note = ({ note }: any) => {
  const [opened, setOpened] = useState(false)

  const { hovered, ref } = useHover()
  const { width } = useViewportSize()

  const imageRef: any = useRef(null)
  const audioRef: any = useRef(null)

  const [image, setImage]: any = useState(note.imageRef || null)
  const [imageFile, setImageFile]: any = useState(null)

  const [audio, setAudio]: any = useState(note.audioRef || null)
  const [audioFile, setAudioFile]: any = useState(null)

  const [loading, setLoading] = useState(false)

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

  const addImage = async (e: any) => {
    const file: File = e.target.files[0]

    if (file) {
      const reader = new FileReader()
      reader.addEventListener('loadend', (e) => setImage(e.target?.result))
      reader.readAsDataURL(file)
      setImageFile(file)
    }
  }

  const addAudio = async (e: any) => {
    const file: File = e.target.files[0]

    if (file) {
      const reader = new FileReader()
      reader.addEventListener('loadend', (e) => setAudio(e.target?.result))
      reader.readAsDataURL(file)
      setAudioFile(file)
    }
  }

  const handleEdit = async () => {
    const newData: NoteModel = { 
      ...note, 
      title: form.values.title, 
      content: form.values.content,
      imageRef: image,
      audioRef: audio
    }

    if (newData !== note) {
      setLoading(true)
      console.log(imageFile)

      const { imagePath, imageUrl } = imageFile ? await uploadImage(imageFile) : { imageUrl: null, imagePath: null }
      const { audioPath, audioUrl } = audioFile ? await uploadAudio(audioFile) : { audioPath: null, audioUrl: null }

      const data: NoteModel = {
        ...note,
        title: form.values.title, 
        content: form.values.content,
        imagePath: imagePath || (image ? note.imagePath : null),
        imageRef: imageUrl || (image ? note.imageRef : null),
        audioPath: audioPath || (audio ? note.audioPath : null),
        audioRef: audioUrl || (audio ? note.audioRef : null)
      }

      editNote(data)
    }

    setOpened(false)
    setLoading(false)
  }

  const longPressEvent = useLongPress(toggleSelect, clickNote)

  return (
    <div className={`note ${note.selected ? 'selected' : null}`} ref={ref}>
      <Modal opened={opened} onClose={() => setOpened(false)} title="Note" overflow="outside">
        <LoadingOverlay visible={loading} />

        <form className="form" onSubmit={form.onSubmit(handleEdit)}>
          <TextInput placeholder="Title" autoFocus 
          {...form.getInputProps('title')}/>

          <input type="file" hidden ref={imageRef} onChange={addImage} />
          <input type="file" hidden ref={audioRef} onChange={addAudio} />

          {image && <img style={{'maxWidth': '100%'}} src={image}/>}

          {audio && (
            <Center>
              <audio controls src={audio}>
                Your browser does not support the <Code>audio</Code> element.
              </audio>
            </Center>
          )}

          <Group position="center" spacing="xl">
            {!image ? (
              <Button variant="outline" radius="xl" size="xs" 
              onClick={() => imageRef.current.click()}
              leftIcon={<IconPhoto />}
              >Add Image</Button>
            ) : (
              <Button variant="outline" radius="xl" size="xs"
              onClick={() => setImage(null)}
              leftIcon={<IconX />}
              >Remove Image</Button>
            )}

            {!audio ? (
              <Button variant="outline" radius="xl" size="xs"
              leftIcon={<IconMusic />} color="orange"
              onClick={() => audioRef.current.click()}
              >Add Audio</Button>
            ) : (
              <Button variant="outline" radius="xl" size="xs"
              onClick={() => setAudio(null)} color="orange"
              leftIcon={<IconX />}
              >Remove Audio</Button>
            )}
          </Group>

          <Textarea placeholder="Content" minRows={8} autosize maxRows={18}
          {...form.getInputProps('content')}/>

          <Group position="right" style={{'margin': 0}}>
            <Button color="green" type="submit">Edit</Button>
          </Group>
        </form>
      </Modal>

      <Paper shadow="xs" radius="md" p="md" withBorder style={{'backgroundColor': note.color || null}}>
        <div {...longPressEvent}>
          {note.imageRef && <img src={note.imageRef} alt={note.imagePath} style={{'maxWidth': '100%'}}/>}

          {note.audioRef && (
            <Center>
              <audio controls src={note.audioRef}>
                Your browser does not support the <Code>audio</Code> element.
              </audio>
            </Center>
          )}

          <div>
            <Title order={4}>{ note.title }</Title>
            <Text lineClamp={12}>{ note.content }</Text>
          </div>
        </div>
        
        {hovered && width > 800 && (
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