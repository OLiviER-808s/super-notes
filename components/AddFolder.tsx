import { ActionIcon, Alert, Button, Group, LoadingOverlay, Modal, TextInput } from "@mantine/core"
import { useHotkeys, useInputState } from "@mantine/hooks"
import { IconAlertCircle, IconFolderPlus } from "@tabler/icons"
import { addDoc, collection, getDocs, query, where } from "firebase/firestore"
import { useState } from "react"
import { useAuthState } from "react-firebase-hooks/auth"
import { auth, db, timestamp } from "../lib/firebase"
import { useItems } from "../providers/ItemProvider"
import { usePath } from "../providers/PathProvider"

const AddFolder = () => {
  const [opened, setOpened] = useState(false)

  const [name, setName] = useInputState('')

  const { path } = usePath()
  const { folders } = useItems()
  const [user] = useAuthState(auth)

  const [error, setError] = useState(false)
  const [loading, setLoading] = useState(false)

  useHotkeys([['shift+f', () => setOpened(true)]])

  const onClose = () => {
    setOpened(false)
    setName('')
  }

  const handleSubmit = async () => {
    if (name) {
      setLoading(true)

      const data = {
        path: path,
        name: name,
        uid: user?.uid,
        createdAt: timestamp()
      }
      const ref = collection(db, 'folders')

      // checks to see if folder with that name already exists in path
      const empty = !folders.find(f => f.name == name)

      if (empty) {
        addDoc(ref, data)

        setOpened(false)
        setLoading(false)
      }
      else {
        setError(true)
        setLoading(false)
      }
    }
  }

  return (
    <>
      <Modal opened={opened} onClose={onClose} title="Add Folder">
        {error && (
          <Alert icon={<IconAlertCircle size={16} />} title="Oops..." color="red">
            Looks like you already have a folder with that name in this directory.
          </Alert>
        )}

        <LoadingOverlay visible={loading} />

        <form className="form" onSubmit={(e) => e.preventDefault()}>
          <TextInput 
          label="Name" 
          placeholder="Folder Name"
          autoFocus 
          data-autofocus
          value={name} 
          onChange={setName}/>

          <Group position="right" style={{'margin': '0'}}>
            <Button color="green" onClick={handleSubmit}>Add Folder</Button>
          </Group>
        </form>
      </Modal>

      <ActionIcon color="blue" size="xl" variant="light" onClick={() => setOpened(true)}>
        <IconFolderPlus />
      </ActionIcon>
    </>
  )
}

export default AddFolder