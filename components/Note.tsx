import { ActionIcon, Button, Center, Code, Group, LoadingOverlay, Modal, Paper, Text, Textarea, TextInput, Title } from "@mantine/core"
import { useForm } from "@mantine/form"
import { useHover, useViewportSize } from "@mantine/hooks"
import { IconCheck, IconMusic, IconPhoto, IconX } from "@tabler/icons"
import { useContext, useEffect, useRef, useState } from "react"
import useLongPress from "../hooks/useLongPress"
import { editNote, uploadAudio, uploadImage } from "../lib/auth"
import { NotesContext, SetNotesContext } from "../providers/NoteProvider"
import NoteModel from "../models/Note.model"
import { useOverlay } from "../providers/OverlayProvider"
import NoteOverlay from "./NoteOverlay"

const Note = ({ note }: any) => {
  const [ opened, setOpened ] = useOverlay(<NoteOverlay id={note.id} />)

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
    toggleSelect()
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

  useEffect(() => {
    if (!opened) {
      setNotes(notes.map((n: NoteModel) => {
        if (n.id === note.id) return { ...note, selected: false }
        else return n
      }))
    }
  }, [opened])

  return (
    <div className={`note ${note.selected ? 'selected' : null}`} ref={ref}>
      <Paper 
      shadow="xs" 
      radius="md" 
      p="md" 
      withBorder 
      style={{'backgroundColor': note.color || null}}>
        <div {...longPressEvent}>
          <Title order={4}>{ note.title }</Title>

          {note.imageRef && <img src={note.imageRef} alt={note.imagePath} style={{'maxWidth': '100%'}}/>}

          {note.audioRef && (
            <Center>
              <audio controls src={note.audioRef}>
                Your browser does not support the <Code>audio</Code> element.
              </audio>
            </Center>
          )}

          <Text lineClamp={12}>{ note.content }</Text>
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