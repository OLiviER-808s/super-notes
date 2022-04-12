import { Center } from "@mantine/core"
import { useElementSize } from "@mantine/hooks"
import Masonry from "react-masonry-css"
import Note from "./Note"

const NoteFeed = ({ notes }: any) => {
  const { ref, width } = useElementSize()

  const breakpointConfig = {
    default: width ? Math.floor(width / 280) : 5,
    700: 2
  }

  return notes && (
    <Center ref={ref}>
      <Masonry breakpointCols={breakpointConfig} 
      className="my-masonry-grid" columnClassName="my-masonry-grid_column">
        {notes.map((note: any) => {
          return (
            <div key={note.id}>
              <Note note={note} />
            </div>
          )
        })}
      </Masonry>
    </Center>
  )
}

export default NoteFeed