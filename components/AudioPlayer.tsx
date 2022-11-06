import { ActionIcon, Button, Center, Slider, Space } from "@mantine/core"
import { IconPlayerPause, IconPlayerPlay } from "@tabler/icons"
import { useEffect, useState } from "react"
import { useAudio } from "../providers/AudioProvider"

const AudioPlayer = ({ src }) => {
  const [ audio, setAudio ]  = useAudio()

  const [playing, setPlaying] = useState(false)

  let timer = null
  const [sliderSelected, setSliderSelected] = useState(false)
  const [autoSliderVal, setAutoSliderVal] = useState(0)
  const [userSliderVal, setUserSliderVal] = useState(0)

  const playPause = () => {
    if (audio && audio.src === src) {
      if (audio.paused) audio.play()
      else audio.pause()
    }
    else {
      setAudio(src)
    }
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

  useEffect(() => {
    if (audio) {
      audio.addEventListener('loadeddata', () => {
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

  return audio && audio.src === src ? (
    <div>
      <Center>
        <ActionIcon size="lg" variant="filled" color="green" onClick={playPause}>
          { playing ? <IconPlayerPause /> : <IconPlayerPlay /> }
        </ActionIcon>
      </Center>

      <Space h="sm" />

      <Slider 
      size="sm" 
      value={sliderSelected ? userSliderVal : autoSliderVal}
      onChange={changeSliderVal}
      onChangeEnd={confirmSliderVal}
      label={getLabel}
      />
    </div>
  ) : (
    <Center>
      <Button 
      onClick={playPause}
      color="orange" 
      variant="outline" 
      size="sm"
      m="sm"
      leftIcon={ <IconPlayerPlay />}>
        Play Audio
      </Button>
    </Center>
  )
}

export default AudioPlayer