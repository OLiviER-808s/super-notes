import { ColorPicker, Popover, useMantineColorScheme } from "@mantine/core"
import { useState } from "react"
import { changeNoteColors } from "../lib/auth"
import { removeDuplicates } from "../lib/helpers"
import NoteModel from "../models/Note.model"

const ColorPopover = ({ children, notes, setNotes }: any) => {
  const [opened, setOpened] = useState(false)
  
  const { colorScheme } = useMantineColorScheme()
  const mainColor = colorScheme === 'dark' ? 'rgb(27, 28, 31)' : 'rgb(255, 255, 255)'

  const changeColor = (e: string) => {
    if (e && notes) {
      let color: any = e.slice(0, 3) + 'a(' + e.slice(4, e.length - 1) + ', 0.4)'
      if (e === 'rgb(27, 28, 31)' || e === 'rgb(255, 255, 255)') color = null
    
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
      {opened && <ColorPicker format="rgb" onChange={changeColor}
      swatches={[mainColor, ...removeDuplicates(notes.map((n: NoteModel) => n.color))]} />}
    </Popover>
  )
}

export default ColorPopover