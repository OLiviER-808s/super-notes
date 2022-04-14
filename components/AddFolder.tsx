import { ActionIcon, Button, Group, Modal, TextInput } from "@mantine/core"
import { useInputState } from "@mantine/hooks"
import { IconFolderPlus } from "@tabler/icons"
import { addDoc, collection } from "firebase/firestore"
import { useContext, useState } from "react"
import { useAuthState } from "react-firebase-hooks/auth"
import { auth, db, timestamp } from "../lib/firebase"
import { PathContext } from "../lib/PathProvider"

const AddFolder = () => {
  const [opened, setOpened] = useState(false)

  const [name, setName] = useInputState('')
  const path = useContext(PathContext)
  const [user] = useAuthState(auth)

  const handleSubmit = async () => {
    if (name) {
      const data = {
        path: path,
        name: name,
        uid: user?.uid,
        createdAt: timestamp()
      }
      const ref = collection(db, 'folders')

      await addDoc(ref, data)
    }
    setOpened(false)
  }

  return (
    <>
      <Modal opened={opened} onClose={() => setOpened(false)} title="Add Folder">
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