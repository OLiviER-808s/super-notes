import { createContext, useState } from "react"

const NotesContext = createContext<any>(null)
const SetNotesContext = createContext<any>(null)

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