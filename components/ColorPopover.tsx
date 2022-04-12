import { ColorPicker, Popover } from "@mantine/core"
import { useContext, useState } from "react"
import { changeNoteColors } from "../lib/auth"
import { NotesContext } from "../lib/NoteProvider"
import NoteModel from "../models/Note.model"

const ColorPopover = ({ children, notes, setNotes }: any) => {
  const [opened, setOpened] = useState(false)

  const changeColor = (e: string) => {
    if (e && notes) {
      let color: any = e.slice(0, 3) + 'a(' + e.slice(4, e.length - 1) + ', 0.6)'
      if (e === '#1a1b1e' || e === '#ffffff') color = ''
    
      setNotes(notes.map((note: NoteModel) => {
        if (note.selected) return { ...note, color: color }
        else return note
      }))
    }
  }

  const confirmChange = () => {
    const selectedNotes = notes.filter((n: NoteModel) => n.selected)
    const color = selectedNotes[0].color

    changeNoteColors(selectedNotes, color)

    setOpened(false)
    setNotes(notes.map((n: NoteModel) => ({ ...n, selected: false })))
  }

  return (
    <Popover opened={opened} 
    onClose={confirmChange} 
    width="auto"
    position="bottom" 
    target={<div onClick={() => setOpened(true)}>{ children }</div>} 
    withArrow>
      {opened && <ColorPicker format="rgb" onChange={changeColor} />}
    </Popover>
  )
}

export default ColorPopover