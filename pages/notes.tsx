import { useHotkeys } from "@mantine/hooks";
import { collection, onSnapshot, orderBy, query, where } from "firebase/firestore";
import { NextPage } from "next";
import { useContext, useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import NoteFeed from "../components/NoteFeed";
import PathTracker from "../components/PathTracker";
import Toolbar from "../components/Toolbar";
import { auth, db } from "../lib/firebase";
import { usePath } from "../providers/PathProvider";
import NoteModel from "../models/Note.model";
import AudioBar from "../components/AudioBar";
import { Center } from "@mantine/core";
import { IconMoodNeutral } from "@tabler/icons";
import { useItems } from "../providers/ItemProvider";

const Notes: NextPage = () => {
  const [user] = useAuthState(auth)

  const { notes, folders, updateItems, selectAll, deselectAll } = useItems()

  const { path } = usePath()

  useEffect(() => {
    if (user) {
      // gets notes
      const noteRef = collection(db, 'notes')
      const noteQuery = query(noteRef, where('uid', '==', user.uid), where('path', '==', path),
      orderBy('createdAt', 'desc'))

      onSnapshot(noteQuery, (snap) => {
        updateItems(snap.docs, 'note')
      })

      // gets folders
      const folderRef = collection(db, 'folders')
      const folderQuery = query(folderRef, where('uid', '==', user.uid), where('path', '==', path),
      orderBy('createdAt', 'desc'))

      onSnapshot(folderQuery, (snap) => {
        updateItems(snap.docs, 'folder')
      })
    }
  }, [user, path])

  useHotkeys([
    ['mod+a', selectAll],
    ['mod+d', deselectAll]
  ])

  return (
    <div>
      <Toolbar />
      <PathTracker />

      <NoteFeed items={[...folders.filter((n: NoteModel) => n.pinned), ...notes.filter((n: NoteModel) => n.pinned)]} />
      <NoteFeed items={[...folders.filter((n: NoteModel) => !n.pinned), ...notes.filter((n: NoteModel) => !n.pinned)]} />

      {notes.length == 0 && folders.length == 0 && (
        <Center p="lg">
          <div>
            <Center>
              <IconMoodNeutral size={32} />
            </Center>

            <h3>No notes here yet</h3>
          </div>
        </Center>
      )}

      <AudioBar />
    </div>
  )
}

export default Notes