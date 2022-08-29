import { ActionIcon, Center, Code, Container, Group, Paper, Text, Title } from "@mantine/core"
import { IconArrowBigLeft, IconArrowBigRight } from "@tabler/icons"

const NoteViewer = ({ note }) => {
  return (
    <Container p="lg">
      <Center>
        <div style={{'width': '100%', 'maxWidth': '600px'}}>
          <Group position="center">
            <ActionIcon color="blue" size="lg" variant="light">
              <IconArrowBigLeft size={26} />
            </ActionIcon>

            <Paper 
            onClick={e => e.stopPropagation()}
            shadow="xs" 
            radius="md" 
            p="md" 
            withBorder 
            style={{'backgroundColor': note.color || null}}>
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

            <ActionIcon color="blue" size="lg" variant="light">
              <IconArrowBigRight size={26} />
            </ActionIcon>
          </Group>
        </div>
      </Center>
    </Container>
  )
}

export default NoteViewer