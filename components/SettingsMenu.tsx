import { ActionIcon, Kbd, List, ListItem, Menu, Modal, useMantineColorScheme } from "@mantine/core"
import { useDisclosure } from "@mantine/hooks"
import { IconKeyboard, IconLogout, IconMoonStars, IconSettings, IconSun, IconTrashX } from "@tabler/icons"
import { useState } from "react"

const SettingsMenu = () => {
  const [opened, handlers] = useDisclosure(false)
  
  const { colorScheme, toggleColorScheme } = useMantineColorScheme()
  const dark = colorScheme === 'dark'

  const [hotkeysModal, setHotkeysModal] = useState(false)

  return (
    <>
      <Modal opened={hotkeysModal} onClose={() => setHotkeysModal(false)} title="Hotkeys">
        <List size="sm" spacing="md">
          <ListItem>
            <Kbd>Ctrl</Kbd> + <Kbd>J</Kbd> Toggle Theme
          </ListItem>
          <ListItem>
            <Kbd>Ctrl</Kbd> + <Kbd>A</Kbd> Select All
          </ListItem>
          <ListItem>
            <Kbd>Ctrl</Kbd> + <Kbd>N</Kbd> Add Note
          </ListItem>
          <ListItem>
            <Kbd>Ctrl</Kbd> + <Kbd>F</Kbd> Add Folder
          </ListItem>
        </List>
      </Modal>

      <Menu control={
        <ActionIcon size="xl">
          <IconSettings />
        </ActionIcon>
      } opened={opened} onClose={handlers.close} onOpen={handlers.open}>
        <Menu.Label>Settings</Menu.Label>

        <Menu.Item icon={dark ? <IconSun size={16} /> : <IconMoonStars size={16} />} onClick={() => toggleColorScheme()}>
          Toggle Theme
        </Menu.Item>

        <Menu.Item icon={<IconKeyboard size={16} />} onClick={() => setHotkeysModal(true)}>
          Show Hotkeys
        </Menu.Item>

        <Menu.Item icon={<IconLogout size={16} />}>
          Logout
        </Menu.Item>

        <Menu.Item color="red" icon={<IconTrashX size={16} />}>
          Delete Account
        </Menu.Item>
      </Menu>
    </>
  )
}

export default SettingsMenu