import { Paper, Text, Title } from "@mantine/core"
import AudioPlayer from "./AudioPlayer"

const NoteViewer = ({ note, colors }) => {
  return (
    <Paper 
    shadow="xs" 
    radius="md" 
    p="md" 
    withBorder 
    style={{...colors, whiteSpace: 'pre-line'}}>
      <Title order={4}>{ note.title }</Title>

      {note.imageRef && <img src={note.imageRef} alt={note.imagePath} style={{'maxWidth': '100%'}}/>}

      {note.audioRef && <AudioPlayer src={note.audioRef} />}

      <Text>{ note.content }</Text>
    </Paper>
  )
}

export default NoteViewer