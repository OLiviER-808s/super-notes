import { Center } from "@mantine/core"
import { useElementSize } from "@mantine/hooks"
import Masonry from "react-masonry-css"
import NoteModel from "../models/Note.model"
import Note from "./Note"

const NoteFeed = ({ notes }: any) => {
  const { ref, width } = useElementSize()

  const breakpointConfig = {
    default: width ? Math.floor(width / 280) : 5,
    700: 2,
    500: 1
  }

  return (
    <Center ref={ref}>
      <Masonry breakpointCols={breakpointConfig} 
      className="my-masonry-grid" columnClassName="my-masonry-grid_column">
        {notes.map((note: NoteModel) => {
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