import { ActionIcon, Kbd, List, Menu, Modal, useMantineColorScheme } from "@mantine/core"
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
      <Modal opened={hotkeysModal} onClose={() => setHotkeysModal(false)} title="Shortcuts">
        <List size="sm" spacing="md">
          <List.Item>
            <Kbd>Ctrl</Kbd> + <Kbd>J</Kbd> Toggle Theme
          </List.Item>
          <List.Item>
            <Kbd>Ctrl</Kbd> + <Kbd>A</Kbd> Select All
          </List.Item>
          <List.Item>
            <Kbd>Ctrl</Kbd> + <Kbd>D</Kbd> Deselect All
          </List.Item>
          <List.Item>
            <Kbd>Shift</Kbd> + <Kbd>N</Kbd> Add Note
          </List.Item>
          <List.Item>
            <Kbd>Shift</Kbd> + <Kbd>F</Kbd> Add Folder
          </List.Item>
        </List>
      </Modal>

      <Menu shadow="lg" opened={opened} onClose={handlers.close} onOpen={handlers.open}>
        <Menu.Target>
          <ActionIcon size="xl">
            <IconSettings />
          </ActionIcon>
        </Menu.Target>

        <Menu.Dropdown>
          <Menu.Label>Settings</Menu.Label>

          <Menu.Item icon={dark ? <IconSun size={16} /> : <IconMoonStars size={16} />} onClick={() => toggleColorScheme()}>
            Toggle Theme
          </Menu.Item>

          <Menu.Item icon={<IconKeyboard size={16} />} onClick={() => setHotkeysModal(true)}>
            Shortcuts
          </Menu.Item>

          <Menu.Item icon={<IconLogout size={16} />} onClick={logout}>
            Logout
          </Menu.Item>

          <Menu.Item color="red" icon={<IconTrashX size={16} />} onClick={deleteAccount}>
            Delete Account
          </Menu.Item>
        </Menu.Dropdown>
      </Menu>
    </>
  )
}

export default SettingsMenu