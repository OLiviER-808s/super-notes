import { ActionIcon, Center, Group } from "@mantine/core"
import { IconFolderPlus, IconPalette, IconPinned, IconSettings, IconTrash, IconX } from "@tabler/icons"
import { useContext } from "react"
import { deleteNotes } from "../lib/auth"
import { SelectedNotesContext, SelectNoteContext } from "../lib/SelectNoteProvider"
import NoteModel from "../models/Note.model"
import AddNote from "./AddNote"

const Toolbar = () => {
  const selectedNotes: NoteModel[] = useContext(SelectedNotesContext)
  const setSelectedNotes = useContext(SelectNoteContext)

  const deleteSelected = () => {
    deleteNotes(selectedNotes)
    setSelectedNotes([])
  }

  return (
    <div style={{'marginBottom': '1.5em'}}>
      <Center>
        <div style={{'maxWidth': '840px', 'width': '100%'}}>
          <Group spacing="xs">
            {selectedNotes.length === 0 && (
              <>
                <AddNote />
              </>
            )}

            {selectedNotes.length > 0 && (
              <>
                <ActionIcon size="xl" variant="light" onClick={() => setSelectedNotes([])}>
                  <IconX />
                </ActionIcon>
                <ActionIcon color="blue" size="xl" variant="light">
                  <IconFolderPlus />
                </ActionIcon>
                <ActionIcon color="orange" size="xl" variant="light">
                  <IconPalette />
                </ActionIcon>
                <ActionIcon size="xl" variant="light">
                  <IconPinned />
                </ActionIcon>
                <ActionIcon size="xl" variant="light" color="red" onClick={deleteSelected}>
                  <IconTrash />
                </ActionIcon>
              </>
            )}

            <div className="spacer"></div>

            <ActionIcon size="xl">
              <IconSettings />
            </ActionIcon>
          </Group>
        </div>
      </Center>
    </div>
  )
}

export default Toolbar