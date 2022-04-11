import { createContext, useState } from "react"

export const SelectedNotesContext = createContext<any>(null)
export const SelectNote = createContext<any>(null)

const SelectNoteProvider = ({ children }: any) => {
  const [selectedNotes, setSelectedNotes] = useState([])

  return (
    <SelectedNotesContext.Provider value={selectedNotes}>
      <SelectNote.Provider value={setSelectedNotes}>
        { children }
      </SelectNote.Provider>
    </SelectedNotesContext.Provider>
  )
}

export default SelectNoteProvider