import { Button, Center, Code, Group, LoadingOverlay, Modal, Textarea, TextInput } from "@mantine/core"
import { useForm } from "@mantine/form"
import { IconMusic, IconNote, IconPhoto, IconX } from "@tabler/icons"
import { useContext, useRef, useState } from "react"
import { auth, db, timestamp } from "../lib/firebase"
import { useAuthState } from "react-firebase-hooks/auth";
import NoteModel from "../models/Note.model"
import { addDoc, collection } from "firebase/firestore"
import { PathContext } from "../lib/PathProvider"
import { useHotkeys } from "@mantine/hooks"
import { uploadAudio, uploadImage } from "../lib/auth"

const AddNote = () => {
  const [opened, setOpened] = useState(false)
  const imageRef: any = useRef(null)
  const audioRef: any = useRef(null)

  const [user] = useAuthState(auth)
  const path = useContext(PathContext)

  const [image, setImage]: any = useState(null)
  const [imageFile, setImageFile]: any = useState(null)

  const [audio, setAudio]: any = useState(null)
  const [audioFile, setAudioFile]: any = useState(null)

  const [loading, setLoading] = useState(false)

  const form = useForm({
    initialValues: {
      title: '',
      content: ''
    }
  })

  useHotkeys([['shift+n', () => setOpened(true)]])

  const addImage = async (e: any) => {
    const file: File = e.target.files[0]

    if (file) {
      const reader = new FileReader()
      reader.addEventListener('loadend', (e) => setImage(e.target?.result))
      reader.readAsDataURL(file)
      setImageFile(file)
    }
  }

  const addAudio = async (e: any) => {
    const file: File = e.target.files[0]

    if (file) {
      const reader = new FileReader()
      reader.addEventListener('loadend', (e) => setAudio(e.target?.result))
      reader.readAsDataURL(file)
      setAudioFile(file)
    }
  }

  const handleSubmit = async () => {
    if (form.values.title || form.values.content) {
      setLoading(true)

      const { imagePath, imageUrl } = image ? await uploadImage(imageFile) : { imageUrl: null, imagePath: null }
      const { audioPath, audioUrl } = audio ? await uploadAudio(audioFile) : { audioPath: null, audioUrl: null }

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
      <Modal overflow="inside" opened={opened} onClose={closeModal} title="Create A New Note">
        <LoadingOverlay visible={loading} />

        <form className="form" onSubmit={form.onSubmit(handleSubmit)}>
          <TextInput placeholder="Note title" label="Title" autoFocus 
          {...form.getInputProps('title')}/>

          <input type="file" hidden ref={imageRef} onChange={addImage} />
          <input type="file" hidden ref={audioRef} onChange={addAudio} />

          {image && <img style={{'maxWidth': '100%'}} src={image}/>}

          {audio && (
            <Center>
              <audio controls src={audio}>
                Your browser does not support the <Code>audio</Code> element.
              </audio>
            </Center>
          )}

          <Group position="center" spacing="xl">
            {!image ? (
              <Button variant="outline" radius="xl" size="xs" 
              onClick={() => imageRef.current.click()}
              leftIcon={<IconPhoto />}
              >Add Image</Button>
            ) : (
              <Button variant="outline" radius="xl" size="xs"
              onClick={() => setImage(null)}
              leftIcon={<IconX />}
              >Remove Image</Button>
            )}

            {!audio ? (
              <Button variant="outline" radius="xl" size="xs"
              leftIcon={<IconMusic />} color="orange"
              onClick={() => audioRef.current.click()}
              >Add Audio</Button>
            ) : (
              <Button variant="outline" radius="xl" size="xs"
              onClick={() => setAudio(null)} color="orange"
              leftIcon={<IconX />}
              >Remove Audio</Button>
            )}
          </Group>

          <Textarea 
          data-autofocus
          autosize 
          minRows={5} 
          placeholder="Your Content" 
          label="Content"
          {...form.getInputProps('content')}/>

          <Group position="right" style={{'margin': '0'}}>
            <Button color="green" type="submit">Add Note</Button>
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