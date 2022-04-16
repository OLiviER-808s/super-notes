import { ActionIcon, Kbd, List, ListItem, Menu, Modal, useMantineColorScheme } from "@mantine/core"
import { useDisclosure } from "@mantine/hooks"
import { IconKeyboard, IconLogout, IconMoonStars, IconSettings, IconSun, IconTrashX } from "@tabler/icons"
import { deleteUser, signOut } from "firebase/auth"
import { useRouter } from "next/router"
import { useState } from "react"
import { useAuthState } from "react-firebase-hooks/auth"
import { auth } from "../lib/firebase"

const SettingsMenu = () => {
  const [opened, handlers] = useDisclosure(false)
  
  const { colorScheme, toggleColorScheme } = useMantineColorScheme()
  const dark = colorScheme === 'dark'

  const [hotkeysModal, setHotkeysModal] = useState(false)

  const router = useRouter()
  const [user]: any = useAuthState(auth)

  const logout = async () => {
    await signOut(auth)
    router.push('/')
  }

  const deleteAccount = async () => {
    // deletes user in auth
    await deleteUser(user)

    router.push('/')
  }

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
            <Kbd>Ctrl</Kbd> + <Kbd>D</Kbd> Deselect All
          </ListItem>
          <ListItem>
            <Kbd>Shift</Kbd> + <Kbd>N</Kbd> Add Note
          </ListItem>
          <ListItem>
            <Kbd>Shift</Kbd> + <Kbd>F</Kbd> Add Folder
          </ListItem>
        </List>
      </Modal>

      <Menu shadow="lg" control={
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

        <Menu.Item icon={<IconLogout size={16} />} onClick={logout}>
          Logout
        </Menu.Item>

        <Menu.Item color="red" icon={<IconTrashX size={16} />} onClick={deleteAccount}>
          Delete Account
        </Menu.Item>
      </Menu>
    </>
  )
}

export default SettingsMenu