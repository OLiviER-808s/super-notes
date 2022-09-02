import { Button, Center, Code, FileButton, Group, Paper, Text, Textarea, TextInput, Title } from "@mantine/core"
import { IconMusic, IconPhoto, IconX } from "@tabler/icons"

const NoteEditor = ({ note, setNote, colors, form }) => {
  const addImage = (file: File) => {
    if (file) {
      const reader = new FileReader()
      reader.addEventListener('loadend', (e) => form.setFieldValue('image', e.target?.result))
      reader.readAsDataURL(file)
      form.setFieldValue('imageFile', file)
    }
  }

  const removeImage = () => {
    form.setFieldValue('imageFile', null)
    form.setFieldValue('image', null)
  }

  const addAudio = (file: File) => {
    if (file) {
      const reader = new FileReader()
      reader.addEventListener('loadend', (e) => form.setFieldValue('audio', e.target?.result))
      reader.readAsDataURL(file)
      form.setFieldValue('audioFile', file)
    }
  }

  const removeAudio = () => {
    form.setFieldValue('audioFile', null)
    form.setFieldValue('audio', null)
  }

  return (
    <Paper 
    shadow="xs" 
    radius="md" 
    p="md" 
    withBorder 
    style={colors}>
      <div className="edit-note">
        <TextInput 
        { ...form.getInputProps('title') }
        size="lg"
        placeholder="Title" 
        variant="unstyled" />

        {form.values.image && <img src={form.values.image} style={{'maxWidth': '100%'}}/>}

        {form.values.audio && (
          <Center>
            <audio controls src={form.values.audio}>
              Your browser does not support the <Code>audio</Code> element.
            </audio>
          </Center>
        )}

        <Group position="center" spacing="xl" py="md">
          {!form.values.image ? (
            <FileButton onChange={addImage} accept="image/png,image/jpeg">
              {props => (
                <Button 
                {...props}
                variant="outline" 
                radius="xl" 
                size="xs" 
                leftIcon={<IconPhoto />}
                >Add Image</Button>
              )}
            </FileButton>
          ) : (
            <Button 
            onClick={removeImage}
            variant="outline" 
            radius="xl" 
            size="xs"
            leftIcon={<IconX />}
            >Remove Image</Button>
          )}

          {!form.values.audio ? (
            <FileButton onChange={addAudio}>
              {props => (
                <Button 
                variant="outline" 
                radius="xl" 
                size="xs"
                leftIcon={<IconMusic />} 
                color="orange"
                >Add Audio</Button>
              )}
            </FileButton>
          ) : (
            <Button 
            onClick={removeAudio}
            variant="outline" 
            radius="xl" 
            size="xs"
            color="orange"
            leftIcon={<IconX />}
            >Remove Audio</Button>
          )}
        </Group>

        <Textarea 
        pt={0}
        { ...form.getInputProps('content') }
        variant="unstyled" 
        size="md"
        autosize
        placeholder="Content" />
      </div>
    </Paper>
  )
}

export default NoteEditor