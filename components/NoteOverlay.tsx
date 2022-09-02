import { ActionIcon, Center, Code, Container, Group, Paper, Text, Title } from "@mantine/core"
import { IconArrowBigLeft, IconArrowBigRight, IconPalette, IconPencil, IconPinned, IconTrash } from "@tabler/icons"
import { useContext, useEffect, useState } from "react"
import { deleteNotes, pinNotes } from "../lib/auth"
import { contrast } from "../lib/contrast"
import { makeSolid } from "../lib/helpers"
import { NotesContext, SetNotesContext } from "../providers/NoteProvider"
import { useOverlay } from "../providers/OverlayProvider"
import ColorPopover from "./ColorPopover"
import NoteViewer from "./NoteViewer"

const NoteOverlay = ({ id }) => {
  const [opened, setOpened] = useOverlay(null)

  const notes = useContext(NotesContext)
  const setNotes = useContext(SetNotesContext)

  const [note, setNote] = useState<any>(notes.filter(n => n.id === id)[0])
  const [idx, setIdx] = useState(notes.indexOf(note))

  const [colors, setColors] = useState({})

  useEffect(() => {
    setNote(notes.filter(n => n.id === note.id)[0])
  }, [notes])

  useEffect(() => {
    if (!note.selected) {
      setNotes(prev => prev.map(n => {
        if (n.id === note.id) return { ...n, selected: true }
        else return { ...n, selected: false }
      }))
    }

    if (note.color) {
      const bgColor = makeSolid(note.color)
      const textColor = contrast(bgColor, 'rgba(192, 193, 197)') > contrast(bgColor, 'rgba(0, 0, 0)') ? 'rgba(192, 193, 197)' : 'rgba(0, 0, 0)'

      setColors({ backgroundColor: bgColor, color: textColor })
    }
    else setColors({ })
  }, [note])

  const deleteNote = () => {
    deleteNotes([ note ])
    setOpened(false)
  }

  const pinNote = () => {
    pinNotes([ note ])
  }

  const moveLeft = () => {
    setNote(notes[idx - 1])
    setIdx(idx - 1)
  }

  const moveRight = () => {
    setNote(notes[idx + 1])
    setIdx(idx + 1)
  }

  return (
    <Container p="xl" data-close-overlay>
      <Center data-close-overlay>
        <div style={{'width': '100%'}} data-close-overlay>
          <Group position="center" data-close-overlay>
            {idx - 1 > -1 && (
              <ActionIcon size="lg" onClick={moveLeft}>
                <IconArrowBigLeft size={26} />
              </ActionIcon>
            )}

            <div style={{'maxWidth': '600px'}}>
              {note.pinned && (
                <Text color="violet"><IconPinned size={16} />Pinned</Text>
              )}

              <NoteViewer note={note} colors={colors} />
            </div>
            
            {idx + 1 < notes.length && (
              <ActionIcon size="lg" onClick={moveRight}>
                <IconArrowBigRight size={26} />
              </ActionIcon>
            )}
          </Group>

          <Group position="center" spacing="md" p="xl" data-close-overlay>
            <ActionIcon color="green" size="xl">
              <IconPencil />
            </ActionIcon>

            <ColorPopover notes={notes} setNotes={setNotes}>
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
        </div>
      </Center>
    </Container>
  )
}

export default NoteOverlay