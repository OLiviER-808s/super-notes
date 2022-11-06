import { ActionIcon, Center, Group } from "@mantine/core"
import { IconPalette, IconPinned, IconTrash, IconX } from "@tabler/icons"
import { deleteItems, pinItems } from "../lib/auth"
import AddFolder from "./AddFolder"
import AddNote from "./AddNote"
import AddToFolder from "./AddToFolder"
import ColorPopover from "./ColorPopover"
import SettingsMenu from "./SettingsMenu"
import { useOverlay } from "../providers/OverlayProvider"
import { useItems } from "../providers/ItemProvider"

const Toolbar = () => {
  const { selectedItems, deselectAll } = useItems()

  const [ overlayOpen ] = useOverlay(null)

  const deleteSelected = () => {
    deleteItems(selectedItems)
    deselectAll()
  }

  const pinSelected = () => {
    pinItems(selectedItems)
  }

  return (
    <div style={{'marginBottom': '1.5em'}}>
      <Center>
        <div style={{'maxWidth': '840px', 'width': '100%'}}>
          <Group spacing="xs">
            {(selectedItems.length === 0 || overlayOpen) && (
              <>
                <AddNote />
                <AddFolder />
              </>
            )}

            {selectedItems.length > 0 && !overlayOpen && (
              <>
                <ActionIcon size="xl" variant="light" onClick={deselectAll}>
                  <IconX />
                </ActionIcon>

                <AddToFolder buttonHover={false} />
                
                <ColorPopover>
                  <ActionIcon color="orange" size="xl" variant="light">
                    <IconPalette />
                  </ActionIcon>
                </ColorPopover>

                <ActionIcon color="violet" size="xl" variant="light" onClick={pinSelected}>
                  <IconPinned />
                </ActionIcon>

                <ActionIcon size="xl" variant="light" color="red" onClick={deleteSelected}>
                  <IconTrash />
                </ActionIcon>
              </>
            )}

            <div className="spacer"></div>

            <SettingsMenu />
          </Group>
        </div>
      </Center>
    </div>
  )
}

export default Toolbar