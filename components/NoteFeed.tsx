import { Center } from "@mantine/core"
import { useElementSize } from "@mantine/hooks"
import { useContext, useEffect } from "react"
import Masonry from "react-masonry-css"
import { SetNotesContext } from "../providers/NoteProvider"
import { useOverlay } from "../providers/OverlayProvider"
import Folder from "./Folder"
import Note from "./Note"

const NoteFeed = ({ items }: any) => {
  const { ref, width } = useElementSize()

  const [ overlayOpen ] = useOverlay(null)
  const setNotes = useContext(SetNotesContext)

  useEffect(() => {
    if (!overlayOpen) {
      setNotes(prev => prev.map((note) => ({ ...note, selected: false })))
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
        {items.map((item: any, idx: number) => {
          return (
            <div key={item.id}>
              { item.content ? <Note note={item} idx={idx} /> : <Folder folder={item} /> }
            </div>
          )
        })}
      </Masonry>
    </Center>
  )
}

export default NoteFeed