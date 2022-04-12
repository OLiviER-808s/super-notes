import { collection, onSnapshot, orderBy, query, where } from "firebase/firestore";
import { NextPage } from "next";
import { useContext, useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import NoteFeed from "../components/NoteFeed";
import Toolbar from "../components/Toolbar";
import { auth, db } from "../lib/firebase";
import NoteListProvider, { NotesContext, SetNotesContext } from "../lib/NoteProvider";

const Notes: NextPage = () => {
  const [user] = useAuthState(auth)
  const setNotes = useContext(SetNotesContext)
  const notes = useContext(NotesContext)

  useEffect(() => {
    if (user) {
      const ref = collection(db, 'notes')
      const q = query(ref, where('uid', '==', user.uid), orderBy('createdAt', 'desc'))

      onSnapshot(q, (snap) => {
        setNotes(snap.docs.map(doc => {
          return { ...doc.data(), id: doc.id, selected: false }
        }))
      })
    }
  }, [user])

  return (
    <div>
      <Toolbar />

      <NoteFeed notes={notes} />
    </div>
  )
}

export default Notes