import { ActionIcon, Group, Paper, Slider, Title } from "@mantine/core"
import { IconPlayerPause, IconPlayerPlay, IconPlayerTrackNext, IconPlayerTrackPrev, IconRepeat, IconX } from "@tabler/icons"
import { useEffect, useState } from "react"
import { useAudio } from "../providers/AudioProvider"
import { useItems } from "../providers/ItemProvider"

const AudioBar = () => {
  const { notesWithAudio } = useItems()

  const [note, setNote] = useState(null)
  const idx = notesWithAudio.indexOf(note)

  const [audio, setAudio] = useAudio()
  const [open, setOpen] = useState(false)

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

  const closeAudio = () => {
    setOpen(false)
    setAudio(null)
  }

  useEffect(() => {
    if (audio) {
      audio.addEventListener('loadeddata', () => {
        setNote(notesWithAudio.filter(n => n.audioRef === audio.src)[0])
        setOpen(true)

        audio.loop = loop
        audio.play()

        if (!timer) {
          timer = setInterval(() => {
            setAutoSliderVal((audio.currentTime / audio.duration) * 100)
          }, 1000)
        }
      }, 500)

      audio.addEventListener('play', () => {
        setOpen(true)
        setPlaying(true)
      })
      audio.addEventListener('pause', () => setPlaying(false))
    }
  }, [audio])

  return audio && open && (
    <div className="footer">
      <Paper p="md" withBorder style={{'backgroundColor': note?.color || null}}>
        <Title order={4}>{ note?.title }</Title>

        <Group position="apart" mb="xs">
          <div style={{'width': '26px'}}></div>

          <Group position="center">
            <ActionIcon size="lg" disabled={!idx || (idx - 1 < 0 && audio.currentTime < 3)} onClick={playPrev}>
              <IconPlayerTrackPrev />
            </ActionIcon>

            <ActionIcon size="lg" variant="filled" color="green" onClick={playPause}>
              { playing ? <IconPlayerPause /> : <IconPlayerPlay /> }
            </ActionIcon>

            <ActionIcon size="lg" disabled={(!idx && idx !== 0) || idx + 1 === notesWithAudio.length} onClick={playNext}>
              <IconPlayerTrackNext />
            </ActionIcon>
          </Group>

          <Group position="center">
            <ActionIcon color={loop ? 'blue' : 'gray'} variant={loop ? 'light' : 'subtle'} onClick={toggleLoop}>
              <IconRepeat />
            </ActionIcon>

            <ActionIcon variant="subtle" onClick={closeAudio}>
              <IconX />
            </ActionIcon>
          </Group>
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