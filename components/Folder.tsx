import { ActionIcon, Group, Paper, Stack, Title } from "@mantine/core"
import { useHover, useViewportSize } from "@mantine/hooks"
import { IconCheck, IconFolder, IconX } from "@tabler/icons"
import useLongPress from "../hooks/useLongPress"
import { useItems } from "../providers/ItemProvider"
import { usePath } from "../providers/PathProvider"

const Folder = ({ folder }: any) => {
  const { selectedItems ,toggleItemSelect } = useItems()
  const { setPath } = usePath()

  const { ref, hovered } = useHover()
  const { width } = useViewportSize()

  const clickFolder = () => {
    if (selectedItems.length > 0) toggleItemSelect(folder.id)
    else setPath((path: string) => path + `/${folder.name}`)
  }

  const longPressEvent = useLongPress(() => toggleItemSelect(folder.id), clickFolder)

  return (
    <div className={folder.selected ? 'selected' : ''} ref={ref}>
      <Paper 
      shadow="xs" 
      radius="md" 
      p="md" 
      withBorder 
      style={{'backgroundColor': folder.color || null}}>
        <Stack align="center" spacing="sm" {...longPressEvent}>
          <ActionIcon size={48}>
            <IconFolder size={48}></IconFolder>
          </ActionIcon>

          <Title order={4}>{ folder.name }</Title>
        </Stack>
        
        {hovered && width > 800 && (
          <Group position="right" onClick={() => toggleItemSelect(folder.id)}>
            <ActionIcon color="blue" size="sm" variant="filled">
              {folder.selected ? <IconX /> : <IconCheck />}
            </ActionIcon>
          </Group>
        )}
      </Paper>
    </div>
  )
}

export default Folder