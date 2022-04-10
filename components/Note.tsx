import { Paper, Text, Title } from "@mantine/core"

const Note = ({ note }: any) => {
  return (
    <div>
      <Paper shadow="xs" radius="md" p="md" withBorder>
        <Title order={4}>{ note.title }</Title>
        <Text>{ note.content }</Text>
      </Paper>
    </div>
  )
}

export default Note