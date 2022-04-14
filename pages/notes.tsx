import { collection, onSnapshot, orderBy, query, where } from "firebase/firestore";
import { NextPage } from "next";
import { useContext, useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import NoteFeed from "../components/NoteFeed";
import Toolbar from "../components/Toolbar";
import { auth, db } from "../lib/firebase";
import { NotesContext, SetNotesContext } from "../lib/NoteProvider";
import NoteModel from "../models/Note.model";

const Notes: NextPage = () => {
  const [user] = useAuthState(auth)

  const setNotes = useContext(SetNotesContext)
  const notes = useContext(NotesContext)

  const [folders, setFolders] = useState<Array<any>>([])

  useEffect(() => {
    if (user) {
      const noteRef = collection(db, 'notes')
      const noteQuery = query(noteRef, where('uid', '==', user.uid), orderBy('createdAt', 'desc'))

      onSnapshot(noteQuery, (snap) => {
        setNotes(snap.docs.map(doc => {
          return { ...doc.data(), id: doc.id, selected: false }
        }))
      })

      const folderRef = collection(db, 'folders')
      const folderQuery = query(folderRef, where('uid', '==', user.uid), orderBy('createdAt', 'desc'))

      onSnapshot(folderQuery, (snap) => {
        setFolders(snap.docs.map(doc => {
          return { ...doc.data(), id: doc.id }
        }))
        console.log(folders)
      })
    }
  }, [user])

  return (
    <div>
      <Toolbar />

      <NoteFeed items={notes.filter((n: NoteModel) => n.pinned)} />
      <NoteFeed items={[...folders, ...notes.filter((n: NoteModel) => !n.pinned)]} />
    </div>
  )
}

export default Notes