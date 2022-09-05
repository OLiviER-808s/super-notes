import { ActionIcon, Button, Center, Group, Paper, Text, Title } from "@mantine/core"
import { useHover, useViewportSize } from "@mantine/hooks"
import { IconCheck, IconPlayerPlay, IconX } from "@tabler/icons"
import { useContext, useEffect, useState } from "react"
import useLongPress from "../hooks/useLongPress"
import { NotesContext, SetNotesContext } from "../providers/NoteProvider"
import NoteModel from "../models/Note.model"
import { useOverlay } from "../providers/OverlayProvider"
import NoteOverlay from "./NoteOverlay"
import { useAudio } from "../providers/AudioProvider"

const Note = ({ note }: any) => {
  const [ opened, setOpened ] = useOverlay(<NoteOverlay id={note.id} />)

  const { hovered, ref } = useHover()
  const { width } = useViewportSize()

  const notes = useContext(NotesContext)
  const setNotes = useContext(SetNotesContext)

  const [ audio, setAudio ] = useAudio()
  const [ playing, setPlaying ] = useState(null)

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

  const playAudio = () => {
    if (audio && audio.src === note.audioRef) {
      if (playing) audio.pause()
      else audio.play()

      setPlaying(!playing)
    }
    else {
      const a = new Audio(note.audioRef)
      setAudio(a)
      setPlaying(true)
    }
    console.log(playing)
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
        <div>
          <div {...longPressEvent}>
            <Title order={4}>{ note.title }</Title>

            {note.imageRef && <img src={note.imageRef} alt={note.imagePath} style={{'maxWidth': '100%'}}/>}
          </div>

          {note.audioRef && (
            <Center>
              <Button 
              id="playAudioBtn"
              onClick={playAudio}
              color="orange" 
              variant="outline" 
              size="sm"
              m="sm"
              leftIcon={<IconPlayerPlay />}>
                Play Audio
              </Button>
            </Center>
          )}

          <div {...longPressEvent}>
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