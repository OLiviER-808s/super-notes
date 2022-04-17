import { Button, Group, Modal, Textarea, TextInput } from "@mantine/core"
import { useForm } from "@mantine/form"
import { IconMusic, IconNote, IconPhoto, IconX } from "@tabler/icons"
import { useContext, useRef, useState } from "react"
import { auth, db, timestamp } from "../lib/firebase"
import { useAuthState } from "react-firebase-hooks/auth";
import NoteModel from "../models/Note.model"
import { addDoc, collection } from "firebase/firestore"
import { PathContext } from "../lib/PathProvider"
import { useHotkeys } from "@mantine/hooks"
import { uploadImage } from "../lib/auth"

const AddNote = () => {
  const [opened, setOpened] = useState(false)
  const ref: any = useRef(null) 

  const [user] = useAuthState(auth)
  const path = useContext(PathContext)

  const [image, setImage]: any = useState('')
  const [imageFile, setImageFile]: any = useState(null)

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

  const handleSubmit = async () => {
    if (form.values.title || form.values.content) {
      const { imagePath, imageRef } = imageFile ? await uploadImage(imageFile) : { imageRef: null, imagePath: null }

      const note: NoteModel = {
        title: form.values.title,
        content: form.values.content,
        pinned: false,
        createdAt: timestamp(),
        uid: user?.uid,
        path: path,
        imagePath: imagePath,
        imageRef: imageRef
      }

      const ref = collection(db, 'notes')
      addDoc(ref, note)

      closeModal()
    }
  }

  const closeModal = () => {
    setOpened(false)
    form.reset()
  }

  return (
    <>
      <Modal opened={opened} onClose={closeModal} title="Create A New Note">
        <form className="form" onSubmit={form.onSubmit(handleSubmit)}>
          <TextInput placeholder="Note title" label="Title" autoFocus 
          {...form.getInputProps('title')}/>

          <input type="file" hidden ref={ref} onChange={addImage}/>

          {image && <img style={{'maxWidth': '100%'}} src={image}/>}

          <Group position="center" spacing="xl">
            {!image ? (
              <Button variant="outline" radius="xl" size="xs" 
              onClick={() => ref.current.click()}
              leftIcon={<IconPhoto />}
              >Add Image</Button>
            ) : (
              <Button variant="outline" radius="xl" size="xs"
              onClick={() => setImage('')}
              leftIcon={<IconX />}
              >Remove Image</Button>
            )}
          </Group>

          <Textarea autosize minRows={5} placeholder="Your Content" label="Content"
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