import { createContext, useState } from "react"

export const NotesContext = createContext<any>(null)
export const SetNotesContext = createContext<any>(null)

const NoteListProvider = ({ children }: any) => {
  const [selectedNotes, setSelectedNotes] = useState([])

  return (
    <NotesContext.Provider value={selectedNotes}>
      <SetNotesContext.Provider value={setSelectedNotes}>
        { children }
      </SetNotesContext.Provider>
    </NotesContext.Provider>
  )
}

export default NoteListProvider