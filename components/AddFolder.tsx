import { ActionIcon, Alert, Button, Group, Modal, TextInput } from "@mantine/core"
import { useInputState } from "@mantine/hooks"
import { IconAlertCircle, IconFolderPlus } from "@tabler/icons"
import { addDoc, collection, doc, getDocs, query, where } from "firebase/firestore"
import { useContext, useState } from "react"
import { useAuthState } from "react-firebase-hooks/auth"
import { auth, db, timestamp } from "../lib/firebase"
import { PathContext } from "../lib/PathProvider"

const AddFolder = () => {
  const [opened, setOpened] = useState(false)

  const [name, setName] = useInputState('')
  const path = useContext(PathContext)
  const [user] = useAuthState(auth)

  const [error, setError] = useState(false)

  const handleSubmit = async () => {
    if (name) {
      const data = {
        path: path,
        name: name,
        uid: user?.uid,
        createdAt: timestamp()
      }
      const ref = collection(db, 'folders')

      // checks to see if folder with that name already exists
      const q = query(ref, where('path', '==', path), where('name', '==', name))
      const empty = (await getDocs(q)).empty

      if (empty) {
        addDoc(ref, data)
        setOpened(false)
      }
      else setError(true)
    }
  }

  return (
    <>
      <Modal opened={opened} onClose={() => setOpened(false)} title="Add Folder">
        {error && (
          <Alert icon={<IconAlertCircle size={16} />} title="Oops..." color="red">
            Looks like you already have a folder with that name in this directory.
          </Alert>
        )}

        <form className="form" onSubmit={(e) => e.preventDefault()}>
          <TextInput label="Name" placeholder="Folder Name" autoFocus 
          value={name} onChange={setName}/>

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