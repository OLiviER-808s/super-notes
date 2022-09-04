import { Button, Center, Code, FileButton, Group, LoadingOverlay, Modal, Textarea, TextInput } from "@mantine/core"
import { useForm } from "@mantine/form"
import { IconMusic, IconNote, IconPhoto, IconX } from "@tabler/icons"
import { useContext, useRef, useState } from "react"
import { auth, db, timestamp } from "../lib/firebase"
import { useAuthState } from "react-firebase-hooks/auth";
import NoteModel from "../models/Note.model"
import { addDoc, collection } from "firebase/firestore"
import { PathContext } from "../providers/PathProvider"
import { useHotkeys } from "@mantine/hooks"
import { uploadAudio, uploadImage } from "../lib/auth"

const AddNote = () => {
  const [opened, setOpened] = useState(false)

  const [user] = useAuthState(auth)
  const path = useContext(PathContext)

  const [loading, setLoading] = useState(false)

  const form = useForm({
    initialValues: {
      title: '',
      content: '',
      audioFile: null,
      audio: null,
      imageFile: null,
      image: null
    }
  })

  useHotkeys([['shift+n', () => setOpened(true)]])

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

  const handleSubmit = async () => {
    console.log(form)
    console.log(form.isDirty())
    if (form.isDirty()) {
      setLoading(true)

      const { imagePath, imageUrl } = form.values.image ? await uploadImage(form.values.imageFile) : { imageUrl: null, imagePath: null }
      const { audioPath, audioUrl } = form.values.audio ? await uploadAudio(form.values.audioFile) : { audioPath: null, audioUrl: null }

      const note: NoteModel = {
        title: form.values.title,
        content: form.values.content,
        pinned: false,
        createdAt: timestamp(),
        uid: user?.uid,
        path: path,
        imagePath: imagePath,
        imageRef: imageUrl,
        audioPath: audioPath,
        audioRef: audioUrl
      }

      const ref = collection(db, 'notes')
      addDoc(ref, note)

      closeModal()
      setLoading(false)
    }
  }

  const closeModal = () => {
    setOpened(false)
    form.reset()
  }

  return (
    <>
      <Modal overflow="outside" opened={opened} onClose={closeModal} title="Create A New Note">
        <LoadingOverlay visible={loading} />

        <form className="form" onSubmit={form.onSubmit(handleSubmit)}>
          <TextInput placeholder="Note title" label="Title" autoFocus 
          {...form.getInputProps('title')}/>

          <Group position="center" spacing="xl" py="xs">
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

          {form.values.image && <img style={{'maxWidth': '100%'}} src={form.values.image}/>}

          {form.values.audio && (
            <Center>
              <audio controls src={form.values.audio}>
                Your browser does not support the <Code>audio</Code> element.
              </audio>
            </Center>
          )}

          <Textarea 
          data-autofocus
          autosize 
          minRows={5} 
          placeholder="Your Content" 
          label="Content"
          {...form.getInputProps('content')}/>

          <Group position="right" style={{'margin': '0'}}>
            <Button color="green" type="submit">Confirm</Button>
          </Group>
        </form>
      </Modal>
  
      <Button color="green" size="md" leftIcon={<IconNote />} onClick={() => setOpened(true)}>
        Add Note
      </Button>
    </>
  )
}

export default AddNote