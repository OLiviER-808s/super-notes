import { Center, ColorPicker, Popover, useMantineColorScheme } from "@mantine/core"
import { useState } from "react"
import { changeItemColors } from "../lib/auth"
import NoteModel from "../models/Note.model"
import { useItems } from "../providers/ItemProvider"

const ColorPopover = ({ children }: any) => {
  const { selectedItems, changeColor } = useItems()

  const [opened, setOpened] = useState(false)
  
  const { colorScheme } = useMantineColorScheme()
  const mainColor = colorScheme === 'dark' ? 'rgb(27, 28, 31)' : 'rgb(255, 255, 255)'

  const confirmChange = () => {
    const color = selectedItems[0].color
    changeItemColors(selectedItems, color)

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