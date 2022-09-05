import { ActionIcon, Group, Paper, Slider, Title } from "@mantine/core"
import { IconPlayerPlay, IconPlayerTrackNext, IconPlayerTrackPrev, IconRepeat } from "@tabler/icons"
import { useEffect, useState } from "react"
import { useAudio } from "../providers/AudioProvider"

const AudioBar = () => {
  const [ audio, setAudio ] = useAudio()

  const [sliderValue, setSliderValue] = useState(0)

  useEffect(() => {
    if (audio) {
      audio.addEventListener('loadeddata', () => {
        audio.play()

        setInterval(() => {
          setSliderValue((audio.currentTime / audio.duration) * 100)
        }, 500)
      })
    }
  }, [audio])

  return (
    <div className="footer">
      <Paper p="md" withBorder>
        <Group position="apart" mb="xs">
          <Title order={4}>Music</Title>

          <Group position="center">
            <ActionIcon size="lg">
              <IconPlayerTrackPrev />
            </ActionIcon>

            <ActionIcon size="lg" variant="filled" color="green">
              <IconPlayerPlay />
            </ActionIcon>

            <ActionIcon size="lg">
              <IconPlayerTrackNext />
            </ActionIcon>
          </Group>

          <ActionIcon>
            <IconRepeat />
          </ActionIcon>
        </Group>

        <div>
          <Slider size="sm" value={sliderValue} />
        </div>
      </Paper>
    </div>
  )
}

export default AudioBar