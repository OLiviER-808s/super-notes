import { ActionIcon, Group, Paper, Slider, Title } from "@mantine/core"
import { IconPlayerPause, IconPlayerPlay, IconPlayerTrackNext, IconPlayerTrackPrev, IconRepeat } from "@tabler/icons"
import { useContext, useEffect, useState } from "react"
import { useAudio } from "../providers/AudioProvider"
import { NotesContext } from "../providers/NoteProvider"

const AudioBar = () => {
  const notes = useContext(NotesContext)
  const notesWithAudio = notes.filter(n => !!n.audioRef)

  const [note, setNote] = useState(null)
  const idx = notesWithAudio.indexOf(note)

  const [audio, setAudio] = useAudio()

  const [playing, setPlaying] = useState(false)

  let timer = null
  const [sliderSelected, setSliderSelected] = useState(false)
  const [autoSliderVal, setAutoSliderVal] = useState(0)
  const [userSliderVal, setUserSliderVal] = useState(0)

  const [loop, setLoop] = useState(false)

  const playPause = () => {
    if (audio.paused) audio.play()
    else audio.pause()
  }

  // user drags slider
  const changeSliderVal = (val) => {
    setSliderSelected(true)
    setUserSliderVal(val)
  }

  // user lest go of slider
  const confirmSliderVal = (val) => {
    audio.currentTime = (val / 100) * audio.duration
    setAutoSliderVal((audio.currentTime / audio.duration) * 100)
    setSliderSelected(false)
  }

  const getLabel = (val) => {
    const total = Math.floor(audio.duration * (val / 100))
    const minutes = Math.floor(total / 60)
    const seconds = total - minutes * 60
    
    return `${minutes < 10 ? '0' : ''}${minutes}:${seconds < 10 ? '0' : ''}${seconds}`
  }

  const toggleLoop = () => {
    audio.loop = !loop
    setLoop(!loop)
  }

  const playNext = () => {
    setNote(notesWithAudio[idx + 1])
    setAudio(notesWithAudio[idx + 1].audioRef)
  }

  const playPrev = () => {
    if (audio.currentTime > 3) {
      audio.currentTime = 0
    }
    else {
      setNote(notesWithAudio[idx - 1])
      setAudio(notesWithAudio[idx - 1].audioRef)
    }
  }

  useEffect(() => {
    if (audio) {
      audio.addEventListener('loadeddata', () => {
        setNote(notesWithAudio.filter(n => n.audioRef === audio.src)[0])

        audio.loop = loop
        audio.play()

        if (!timer) {
          timer = setInterval(() => {
            setAutoSliderVal((audio.currentTime / audio.duration) * 100)
          }, 1000)
        }
      }, 500)

      audio.addEventListener('play', () => setPlaying(true))
      audio.addEventListener('pause', () => setPlaying(false))
    }
  }, [audio])

  return audio && (
    <div className="footer">
      <Paper p="md" withBorder style={{'backgroundColor': note?.color || null}}>
        <Group position="apart" mb="xs">
          <Title order={4}>{ note?.title }</Title>

          <Group position="center">
            <ActionIcon size="lg" disabled={!idx || idx - 1 < 0} onClick={playPrev}>
              <IconPlayerTrackPrev />
            </ActionIcon>

            <ActionIcon size="lg" variant="filled" color="green" onClick={playPause}>
              { playing ? <IconPlayerPause /> : <IconPlayerPlay /> }
            </ActionIcon>

            <ActionIcon size="lg" disabled={(!idx && idx !== 0) || idx + 1 === notesWithAudio.length} onClick={playNext}>
              <IconPlayerTrackNext />
            </ActionIcon>
          </Group>

          <ActionIcon color={loop ? 'blue' : 'gray'} variant={loop ? 'light' : 'subtle'} onClick={toggleLoop}>
            <IconRepeat />
          </ActionIcon>
        </Group>

        <div>
          <Slider 
          size="sm" 
          value={sliderSelected ? userSliderVal : autoSliderVal}
          onChange={changeSliderVal}
          onChangeEnd={confirmSliderVal}
          label={getLabel}
          />
        </div>
      </Paper>
    </div>
  )
}

export default AudioBar