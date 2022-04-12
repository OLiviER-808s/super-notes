import { doc, writeBatch } from "firebase/firestore"
import NoteModel from "../models/Note.model"
import { db } from "./firebase"

export const deleteNotes = async (notes: NoteModel[]) => {
  const batch = writeBatch(db)

  notes.forEach(note => {
    const ref = doc(db, `notes/${note.id}`)
    batch.delete(ref)
  })

  await batch.commit()
}

export const changeNoteColors = async (notes: NoteModel[], color: string) => {
  const batch = writeBatch(db)

  notes.forEach(note => {
    const ref = doc(db, `notes/${note.id}`)
    batch.update(ref, { color: color })
  })

  await batch.commit()
}

export const pinNotes = async (notes: NoteModel[]) => {
  const batch = writeBatch(db)

  notes.forEach(note => {
    const ref = doc(db, `notes/${note.id}`)
    batch.update(ref, { pinned: !note.pinned })
  })

  await batch.commit()
}

export const addNotesToFolder = async (notes: NoteModel[], path: string) => {
  const batch = writeBatch(db)

  notes.forEach(note => {
    const ref = doc(db, `notes/${note.id}`)
    batch.update(ref, { path: path })
  })

  await batch.commit()
}