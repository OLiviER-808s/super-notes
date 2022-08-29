import { ActionIcon, Center, Code, Container, Group, Paper, Text, Title } from "@mantine/core"
import { IconArrowBigLeft, IconArrowBigRight, IconFolderPlus, IconPalette, IconPinned, IconTrash } from "@tabler/icons"
import { contrast } from "../lib/contrast"
import { makeSolid } from "../lib/helpers"

const NoteViewer = ({ note }) => {
  const getNoteColors = () => {
    if (note.color) {
      const bgColor = makeSolid(note.color)
      const textColor = contrast(bgColor, 'rgba(192, 193, 197)') > contrast(bgColor, 'rgba(0, 0, 0)') ? 'rgba(192, 193, 197)' : 'rgba(0, 0, 0)'

      return { backgroundColor: bgColor, color: textColor }
    }
    else return { }
  }

  return (
    <Container p="xl">
      <Center>
        <div style={{'width': '100%'}}>
          <Group position="center">
            <ActionIcon size="lg">
              <IconArrowBigLeft size={26} />
            </ActionIcon>

            <div style={{'maxWidth': '600px'}}>
              <Paper 
              onClick={e => e.stopPropagation()}
              shadow="xs" 
              radius="md" 
              p="md" 
              withBorder 
              style={getNoteColors()}>
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
              </Paper>
            </div>

            <ActionIcon size="lg">
              <IconArrowBigRight size={26} />
            </ActionIcon>
          </Group>

          <Group position="center" spacing="md" p="xl">
            <ActionIcon color="blue" size="xl">
              <IconFolderPlus />
            </ActionIcon>

            <ActionIcon color="orange" size="xl">
              <IconPalette />
            </ActionIcon>

            <ActionIcon size="xl" color="violet">
              <IconPinned />
            </ActionIcon>

            <ActionIcon size="xl" color="red">
              <IconTrash />
            </ActionIcon>
          </Group>
        </div>
      </Center>
    </Container>
  )
}

export default NoteViewer