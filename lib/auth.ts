import { deleteDoc, doc, setDoc, writeBatch } from "firebase/firestore"
import { getDownloadURL, ref, uploadBytes } from "firebase/storage"
import FolderModel from "../models/Folder.model"
import NoteModel from "../models/Note.model"
import { db, storage, timestamp } from "./firebase"

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

export const editNote = async (note: NoteModel) => {
  const ref = doc(db, `notes/${note.id}`)
  delete note.id

  await setDoc(ref, note)
}

export const deleteFolder = async (id: string) => {
  const ref = doc(db, `folders/${id}`)

  await deleteDoc(ref)
}

export const uploadImage = async (file: File) => {
  const imagePath = `images/${timestamp()}_${file.name}`

  const r = ref(storage, imagePath)
  await uploadBytes(r, file)

  const imageUrl = await getDownloadURL(r)

  return { imagePath, imageUrl }
}

export const uploadAudio = async (file: File) => {
  const audioPath = `audio/${timestamp()}_${file.name}`

  const r = ref(storage, audioPath)
  await uploadBytes(r, file)

  const audioUrl = await getDownloadURL(r)

  return { audioPath, audioUrl }
}