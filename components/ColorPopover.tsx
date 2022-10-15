import { Center, ColorPicker, Popover, useMantineColorScheme } from "@mantine/core"
import { useState } from "react"
import { changeNoteColors } from "../lib/auth"
import { makeSolid, makeTransparent, removeDuplicates } from "../lib/helpers"
import NoteModel from "../models/Note.model"

const ColorPopover = ({ children, notes, setNotes }: any) => {
  const [opened, setOpened] = useState(false)
  
  const { colorScheme } = useMantineColorScheme()
  const mainColor = colorScheme === 'dark' ? 'rgb(27, 28, 31)' : 'rgb(255, 255, 255)'

  const changeColor = (color: string) => {
    setNotes(notes.map((note: NoteModel) => {
      if (note.selected) return { ...note, color: color }
      else return note
    }))
  }

  const confirmChange = () => {
    const selectedNotes = notes.filter((n: NoteModel) => n.selected)
    const color = selectedNotes[0].color

    changeNoteColors(selectedNotes, color)

    setOpened(false)
  }

  return (
    <Popover 
    opened={opened} 
    onClose={confirmChange} 
    width="auto"
    position="bottom"
    withArrow>
      <Popover.Target>
        <div onClick={() => setOpened(true)}>{ children }</div>
      </Popover.Target>
      
      <Popover.Dropdown>
        <Center>
          <ColorPicker 
          format="rgb" 
          size="md"
          withPicker={false}
          onChange={changeColor} 
          swatches={[mainColor, '#f53b3b', '#f5d63b', '#95f53b', '#2af548', '#3bf5cc', '#3e3bf5', '#a13bf5', '#f53be2']} />
        </Center>
      </Popover.Dropdown>
    </Popover>
  )
}

export default ColorPopover