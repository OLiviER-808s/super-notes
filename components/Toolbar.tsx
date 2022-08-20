import { ActionIcon, Center, Group } from "@mantine/core"
import { IconPalette, IconPinned, IconTrash, IconX } from "@tabler/icons"
import { useContext } from "react"
import { deleteNotes, pinNotes } from "../lib/auth"
import { NotesContext, SetNotesContext } from "../lib/NoteProvider"
import NoteModel from "../models/Note.model"
import AddFolder from "./AddFolder"
import AddNote from "./AddNote"
import AddToFolder from "./AddToFolder"
import ColorPopover from "./ColorPopover"
import SettingsMenu from "./SettingsMenu"

const Toolbar = () => {
  const notes: NoteModel[] = useContext(NotesContext)
  const setNotes = useContext(SetNotesContext)

  const selectedNotes = notes.filter((note: NoteModel) => note.selected)

  const deleteSelected = () => {
    deleteNotes(selectedNotes)
    deselectAll()
  }

  const pinSelected = () => {
    pinNotes(selectedNotes)
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
                <AddFolder />
              </>
            )}

            {selectedNotes.length > 0 && (
              <>
                <ActionIcon size="xl" variant="light" onClick={deselectAll}>
                  <IconX />
                </ActionIcon>

                <AddToFolder />
                
                <ColorPopover notes={notes} setNotes={setNotes}>
                  <ActionIcon color="orange" size="xl" variant="light">
                    <IconPalette />
                  </ActionIcon>
                </ColorPopover>

                <ActionIcon size="xl" variant="light" onClick={pinSelected}>
                  <IconPinned />
                </ActionIcon>

                <ActionIcon size="xl" variant="light" color="red" onClick={deleteSelected}>
                  <IconTrash />
                </ActionIcon>
              </>
            )}

            <div className="spacer"></div>

            <SettingsMenu />
          </Group>
        </div>
      </Center>
    </div>
  )
}

export default Toolbar