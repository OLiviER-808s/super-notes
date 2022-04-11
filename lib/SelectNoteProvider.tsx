import { createContext, useState } from "react"

export const SelectedNotesContext = createContext<any>(null)
export const SelectNoteContext = createContext<any>(null)

const SelectNoteProvider = ({ children }: any) => {
  const [selectedNotes, setSelectedNotes] = useState([])

  return (
    <SelectedNotesContext.Provider value={selectedNotes}>
      <SelectNoteContext.Provider value={setSelectedNotes}>
        { children }
      </SelectNoteContext.Provider>
    </SelectedNotesContext.Provider>
  )
}

export default SelectNoteProvider