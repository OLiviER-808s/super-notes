import { ActionIcon, Center, Group } from "@mantine/core"
import { IconFolderPlus, IconPalette, IconPinned, IconSettings, IconTrash, IconX } from "@tabler/icons"
import { useContext } from "react"
import { deleteNotes } from "../lib/auth"
import { NotesContext, SetNotesContext } from "../lib/NoteProvider"
import NoteModel from "../models/Note.model"
import AddNote from "./AddNote"
import ColorPopover from "./ColorPopover"

const Toolbar = () => {
  const notes: NoteModel[] = useContext(NotesContext)
  const setNotes = useContext(SetNotesContext)

  const selectedNotes = notes.filter((note: NoteModel) => note.selected)

  const deleteSelected = () => {
    deleteNotes(selectedNotes)
    deselectAll()
  }

  const deselectAll = () => {
    setNotes(notes.map((note: NoteModel) => ({ ...note, selected: false })))
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
                <ActionIcon size="xl" variant="light" onClick={deselectAll}>
                  <IconX />
                </ActionIcon>

                <ActionIcon color="blue" size="xl" variant="light">
                  <IconFolderPlus />
                </ActionIcon>
                
                <ColorPopover notes={notes} setNotes={setNotes}>
                  <ActionIcon color="orange" size="xl" variant="light">
                    <IconPalette />
                  </ActionIcon>
                </ColorPopover>

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