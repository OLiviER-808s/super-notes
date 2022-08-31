import { ActionIcon, Modal, Select, Group, Text, Button } from "@mantine/core"
import { IconFolderPlus } from "@tabler/icons"
import { collection, doc, getDocs, query, where, writeBatch } from "firebase/firestore"
import { forwardRef, useContext, useEffect, useState } from "react"
import { useAuthState } from "react-firebase-hooks/auth"
import { auth, db } from "../lib/firebase"
import { NotesContext } from "../providers/NoteProvider"
import NoteModel from "../models/Note.model"

const SelectItem = forwardRef<HTMLDivElement, any>(
  ({ label, description, ...others }: any, ref) => (
    <div ref={ref} {...others}>
      <Group noWrap>
        <div>
          <Text size="sm">{label}</Text>
          <Text size="xs" color="dimmed">
            {description}
          </Text>
        </div>
      </Group>
    </div>
  )
);

const AddToFolder = ({ buttonHover }) => {
  const [opened, setOpened] = useState(false)

  const [folders, setFolders] = useState<any>([])
  const selectionData = folders.map((f: any) => {
    return { 
      label: f.name, 
      description: f.path,
      value: f.path ? `${f.path}/${f.name}` : f.name
    }
  })
  const [selectedFolder, setSelectedFolder] = useState('')

  const [user] = useAuthState(auth)

  const selectedNotes = useContext(NotesContext).filter((note: NoteModel) => note.selected)

  const getFolders = async () => {
    if (opened && user) {
      const ref = collection(db, 'folders')
      const q = query(ref, where('uid', '==', user.uid))

      const snap = await getDocs(q)
      const root = {
        name: 'notes',
        path: null
      }

      setFolders([root, ...snap.docs.map(f => ({ ...f.data(), id: f.id }))])
    }
  }

  const handleFolderMove = async () => {
    if (selectedFolder) {
      const batch = writeBatch(db)

      selectedNotes.forEach((n: NoteModel) => {
        const ref = doc(db, `notes/${n.id}`)
        batch.update(ref, { path: selectedFolder })
      })

      batch.commit()
      
      setOpened(false)
    }
  }

  useEffect(() => {
    getFolders()
  }, [opened])

  return (
    <>
      <Modal opened={opened} onClose={() => setOpened(false)} title="Move To Folder">
        <div className="form">
          <Select 
          onChange={(path) => path ? setSelectedFolder(path) : null}
          itemComponent={SelectItem} 
          label="Add to folder" 
          placeholder="Pick a folder" 
          data={selectionData}/>
          
          <Group position="right" style={{'margin': '0'}}>
            <Button color="green" onClick={handleFolderMove}>Add</Button>
          </Group>
        </div>
      </Modal>

      <ActionIcon color="blue" size="xl" variant={buttonHover ? 'hover' : 'light'} onClick={() => setOpened(true)}>
        <IconFolderPlus />
      </ActionIcon>
    </>
  )
}

export default AddToFolder