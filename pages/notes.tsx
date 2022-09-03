import { useHotkeys } from "@mantine/hooks";
import { collection, onSnapshot, orderBy, query, where } from "firebase/firestore";
import { NextPage } from "next";
import { useContext, useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import NoteFeed from "../components/NoteFeed";
import PathTracker from "../components/PathTracker";
import Toolbar from "../components/Toolbar";
import { auth, db } from "../lib/firebase";
import { NotesContext, SetNotesContext } from "../providers/NoteProvider";
import { PathContext } from "../providers/PathProvider";
import NoteModel from "../models/Note.model";

const Notes: NextPage = () => {
  const [user] = useAuthState(auth)

  const setNotes = useContext(SetNotesContext)
  const notes = useContext(NotesContext)

  const [folders, setFolders] = useState<Array<any>>([])
  const path = useContext(PathContext)

  useEffect(() => {
    if (user) {
      // gets notes
      const noteRef = collection(db, 'notes')
      const noteQuery = query(noteRef, where('uid', '==', user.uid), where('path', '==', path),
      orderBy('createdAt', 'desc'))

      onSnapshot(noteQuery, (snap) => {
        setNotes(prev => {
          return snap.docs.map(doc => {
            const selected = prev.filter(n => n.id === doc.id)[0]?.selected || false

            return { ...doc.data(), id: doc.id, selected: selected }
          })
        })
      })

      // gets folders
      const folderRef = collection(db, 'folders')
      const folderQuery = query(folderRef, where('uid', '==', user.uid), where('path', '==', path),
      orderBy('createdAt', 'desc'))

      onSnapshot(folderQuery, (snap) => {
        setFolders(snap.docs.map(doc => {
          return { ...doc.data(), id: doc.id }
        }))
      })
    }
  }, [user, path])

  useHotkeys([
    ['mod+a', () => setNotes(notes.map((n: NoteModel) => ({ ...n, selected: true })))],
    ['mod+d', () => setNotes(notes.map((n: NoteModel) => ({ ...n, selected: false })))]
  ])

  return (
    <div>
      <Toolbar />
      <PathTracker />

      <NoteFeed items={notes.filter((n: NoteModel) => n.pinned)} />
      <NoteFeed items={[...folders, ...notes.filter((n: NoteModel) => !n.pinned)]} />
    </div>
  )
}

export default Notes