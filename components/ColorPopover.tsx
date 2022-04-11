import { ColorPicker, Popover } from "@mantine/core"
import { useState } from "react"

const ColorPopover = ({ children, notes, setNotes }: any) => {
  const [opened, setOpened] = useState(false)

  return (
    <Popover opened={opened} 
    onClose={() => setOpened(false)} 
    width="auto"
    position="bottom" 
    target={<div onClick={() => setOpened(true)}>{ children }</div>} 
    withArrow>
      <ColorPicker format="rgb" />
    </Popover>
  )
}

export default ColorPopover