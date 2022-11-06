import { ActionIcon, Button, Center, Code, Container, Group, Paper, Text, Title } from "@mantine/core"
import { useForm } from "@mantine/form"
import { IconArrowBigLeft, IconArrowBigRight, IconPalette, IconPencil, IconPinned, IconTrash, IconX } from "@tabler/icons"
import { useContext, useEffect, useState } from "react"
import { deleteItems, editNote, pinItems, uploadAudio, uploadImage } from "../lib/auth"
import { contrast } from "../lib/contrast"
import { makeSolid } from "../lib/helpers"
import NoteModel from "../models/Note.model"
import { useItems } from "../providers/ItemProvider"
import { useOverlay } from "../providers/OverlayProvider"
import ColorPopover from "./ColorPopover"
import NoteEditor from "./NoteEditor"
import NoteViewer from "./NoteViewer"

const NoteOverlay = ({ id }) => {
  const [opened, setOpened] = useOverlay(null)
  const [loading, setLoading] = useState(false)

  const { notes, selectItem } = useItems()

  const [note, setNote] = useState<any>(notes.filter(n => n.id === id)[0])
  const [idx, setIdx] = useState(notes.indexOf(note))

  const [colors, setColors] = useState({})

  const [editMode, setEditMode] = useState(false)
  const form = useForm({
    initialValues: {
      title: note.title,
      content: note.content,
      audioFile: null,
      audio: note.audioRef || null,
      imageFile: null,
      image: note.imageRef || null
    }
  })

  useEffect(() => {
    setNote(notes.filter(n => n.id === note.id)[0])
  }, [notes])

  useEffect(() => {
    if (!note.selected) {
      selectItem(id)
    }

    if (note.color) {
      const bgColor = makeSolid(note.color)
      const textColor = contrast(bgColor, 'rgba(192, 193, 197)') > contrast(bgColor, 'rgba(0, 0, 0)') ? 'rgba(192, 193, 197)' : 'rgba(0, 0, 0)'

      setColors({ backgroundColor: bgColor, color: textColor })
    }
    else setColors({ })
  }, [note])

  const deleteNote = () => {
    deleteItems([ note ])
    setOpened(false)
  }

  const pinNote = () => {
    pinItems([ note ])
  }

  const moveLeft = () => {
    setNote(notes[idx - 1])
    setIdx(idx - 1)
  }

  const moveRight = () => {
    setNote(notes[idx + 1])
    setIdx(idx + 1)
  }

  const submitEdit = async () => {
    if (form.isDirty()) {
      setLoading(true)

      const { imagePath, imageUrl } = form.values.imageFile ? await uploadImage(form.values.imageFile) : { imageUrl: null, imagePath: null }
      const { audioPath, audioUrl } = form.values.audioFile ? await uploadAudio(form.values.audioFile) : { audioPath: null, audioUrl: null }

      const data: NoteModel = {
        ...note,
        title: form.values.title, 
        content: form.values.content,
        imagePath: imagePath || (form.values.image ? note.imagePath : null),
        imageRef: imageUrl || (form.values.image ? note.imageRef : null),
        audioPath: audioPath || (form.values.audio ? note.audioPath : null),
        audioRef: audioUrl || (form.values.audio ? note.audioRef : null)
      }

      editNote(data)
    }
    setLoading(false)
    setEditMode(false)
  }

  const closeEditMode = () => {
    setEditMode(false)
    form.reset()
  }

  return (
    <Container p="xl" data-close-overlay>
      <Center data-close-overlay>
        <div style={{'width': '100%'}} data-close-overlay>
          <Group position="center" data-close-overlay>
            {idx - 1 > -1 && !editMode && (
              <ActionIcon size="lg" onClick={moveLeft}>
                <IconArrowBigLeft size={26} />
              </ActionIcon>
            )}

            <div style={{'width': '100%', 'maxWidth': '600px'}}>
              {note.pinned && (
                <Text color="violet"><IconPinned size={16} />Pinned</Text>
              )}

              {editMode ? 
              <NoteEditor form={form} loading={loading} /> : 
              <NoteViewer note={note} colors={colors} />}
            </div>
            
            {idx + 1 < notes.length && !editMode && (
              <ActionIcon size="lg" onClick={moveRight}>
                <IconArrowBigRight size={26} />
              </ActionIcon>
            )}
          </Group>

          {!editMode ? (
            <Group position="center" spacing="md" p="xl" data-close-overlay>
              <ActionIcon color="green" size="xl" onClick={() => setEditMode(true)}>
                <IconPencil />
              </ActionIcon>

              <ColorPopover>
                <ActionIcon color="orange" size="xl">
                  <IconPalette />
                </ActionIcon>
              </ColorPopover>

              <ActionIcon size="xl" color="violet" onClick={pinNote}>
                <IconPinned />
              </ActionIcon>

              <ActionIcon size="xl" color="red" onClick={deleteNote}>
                <IconTrash />
              </ActionIcon>
            </Group>
          ) : (
            <Center data-close-overlay>
              <div style={{'width': '100%', 'maxWidth': '600px'}} data-close-overlay>
                <Group position="right" py="xl" data-close-overlay>
                  <ActionIcon size="xl" onClick={closeEditMode}>
                    <IconX />
                  </ActionIcon>

                  <Button color="green" size="md" leftIcon={<IconPencil />} onClick={submitEdit}>Confirm</Button>
                </Group>
              </div>
            </Center>
          )}
        </div>
      </Center>
    </Container>
  )
}

export default NoteOverlay