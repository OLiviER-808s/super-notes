import { Button, Center, Group } from "@mantine/core"
import { IconArrowBigRight } from "@tabler/icons"
import { useContext } from "react"
import { PathContext, SetPathContext } from "../lib/PathProvider"

const PathTracker = () => {
  const path: string = useContext(PathContext)
  const setPath = useContext(SetPathContext)

  return (
    <Center>
      <Group spacing="xs" style={{'maxWidth': '840px', 'width': '100%'}}>
        {path !== 'notes' && path.split('/').map((d, idx, arr) => {
          return (
            <>
              <Button variant="outline" color="gray" radius="md" compact
              onClick={() => setPath(path.split(d)[0] + d)}>{ d }</Button>
              { idx < arr.length - 1 && <IconArrowBigRight /> }
            </>
          )
        })}
      </Group>
    </Center>
  )
}

export default PathTracker