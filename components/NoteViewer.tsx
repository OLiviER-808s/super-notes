import { Center, Code, Paper, Text, Title } from "@mantine/core"

const NoteViewer = ({ note, colors }) => {
  return (
    <Paper 
    shadow="xs" 
    radius="md" 
    p="md" 
    withBorder 
    style={{...colors, whiteSpace: 'pre-line'}}>
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
        <Text>{ note.content }</Text>
      </div>
    </Paper>
  )
}

export default NoteViewer