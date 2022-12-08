import { ActionIcon, Button, Center, Group, Paper, Text, Title } from "@mantine/core"
import { useHover, useViewportSize } from "@mantine/hooks"
import { IconCheck, IconPlayerPause, IconPlayerPlay, IconX } from "@tabler/icons"
import { useEffect, useState } from "react"
import useLongPress from "../hooks/useLongPress"
import NoteModel from "../models/Note.model"
import { useOverlay } from "../providers/OverlayProvider"
import NoteOverlay from "./NoteOverlay"
import { useAudio } from "../providers/AudioProvider"
import { contrast } from "../lib/contrast"
import { useItems } from "../providers/ItemProvider"

const Note = ({ note }: any) => {
  const [ opened, setOpened ] = useOverlay(<NoteOverlay id={note.id} />)

  const { hovered, ref } = useHover()
  const { width } = useViewportSize()

  const { selectedItems, deselectItem, toggleItemSelect } = useItems()

  const [ audio, setAudio ] = useAudio()
  const [ playing, setPlaying ] = useState(false)

  const textColor = note.color ? contrast(note.color, 'rgba(192, 193, 197)') > contrast(note.color, 'rgba(0, 0, 0)') ? 'rgba(192, 193, 197)' : 'rgba(0, 0, 0)' : null

  const clickNote = () => {
    if (selectedItems.length === 0) setOpened(true)
    toggleItemSelect(note.id)
  }

  const longPressEvent = useLongPress(() => toggleItemSelect(note.id), clickNote)

  const playPause = () => {
    if (audio && audio.src === note.audioRef) {
      if (audio.paused) audio.play()
      else audio.pause()
    }
    else {
      setAudio(note.audioRef)
    }
  }

  useEffect(() => {
    if (audio) {
      audio.addEventListener('play', () => {
        if (audio.src === note.audioRef) setPlaying(true)
      })
      audio.addEventListener('pause', () => {
        if (audio.src === note.audioRef) setPlaying(false)
      })
      audio.addEventListener('loadeddata', () => {
        if (audio.src !== note.audioRef) setPlaying(false)
      })
    }
    else {
      setPlaying(false)
    }
  }, [audio])

  useEffect(() => {
    if (!opened) {
      deselectItem(note.id)
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
            <Title order={4} style={{ color: textColor, wordWrap: 'break-word'}}>{ note.title }</Title>

            {note.imageRef && <img src={note.imageRef} alt={note.imagePath} style={{'maxWidth': '100%'}}/>}
          </div>

          {note.audioRef && (
            <Center>
              <Button 
              onClick={playPause}
              color="orange" 
              variant="outline" 
              size="sm"
              m="sm"
              leftIcon={playing ? <IconPlayerPause /> : <IconPlayerPlay />}>
                { playing ? 'Pause Audio' : 'Play Audio' }
              </Button>
            </Center>
          )}

          <div {...longPressEvent}>
            <Text lineClamp={12} style={{color: textColor}}>{ note.content }</Text>
          </div>
        </div>
        
        {hovered && width > 800 && (
          <Group position="right" spacing="xs">
            <ActionIcon color="blue" size="sm" variant="filled" onClick={() => toggleItemSelect(note.id)}>
              {note.selected ? <IconX /> : <IconCheck />}
            </ActionIcon>
          </Group>
        )}
      </Paper>
    </div>
  )
}

export default Note