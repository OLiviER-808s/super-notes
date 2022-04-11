import { collection, onSnapshot, orderBy, query, where } from "firebase/firestore";
import { NextPage } from "next";
import { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import NoteFeed from "../components/NoteFeed";
import Toolbar from "../components/Toolbar";
import { auth, db } from "../lib/firebase";
import SelectNoteProvider from "../lib/SelectNoteProvider";

const Notes: NextPage = () => {
  const [user] = useAuthState(auth)
  const [notes, setNotes] = useState<any>([])

  useEffect(() => {
    if (user) {
      const ref = collection(db, 'notes')
      const q = query(ref, where('uid', '==', user.uid), orderBy('createdAt', 'desc'))

      onSnapshot(q, (snap) => {
        setNotes(snap.docs.map(doc => {
          return { ...doc.data(), id: doc.id }
        }))
      })
    }
  }, [user])

  return (
    <SelectNoteProvider>
      <div>
        <Toolbar />

        <NoteFeed notes={notes} />
      </div>
    </SelectNoteProvider>
  )
}

export default Notes