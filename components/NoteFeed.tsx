import { Center } from "@mantine/core"
import { useElementSize } from "@mantine/hooks"
import { useContext, useEffect } from "react"
import Masonry from "react-masonry-css"
import { useItems } from "../providers/ItemProvider"
import { useOverlay } from "../providers/OverlayProvider"
import Folder from "./Folder"
import Note from "./Note"

const NoteFeed = ({ items }: any) => {
  const { ref, width } = useElementSize()

  const [ overlayOpen ] = useOverlay(null)
  const { deselectAll } = useItems()

  useEffect(() => {
    if (!overlayOpen) {
      deselectAll()
    }
  }, [overlayOpen])

  const breakpointConfig = {
    default: width ? Math.floor(width / 280) : 5,
    700: 2,
    300: 1
  }

  return items && (
    <Center ref={ref} style={{'marginBottom': '1em'}}>
      <Masonry breakpointCols={breakpointConfig} 
      className="my-masonry-grid" columnClassName="my-masonry-grid_column">
        {items.map((item: any) => {
          return (
            <div key={item.id}>
              { item.type === 'note' ? <Note note={item} /> : <Folder folder={item} /> }
            </div>
          )
        })}
      </Masonry>
    </Center>
  )
}

export default NoteFeed