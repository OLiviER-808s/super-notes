import { deleteDoc, doc, setDoc, writeBatch } from "firebase/firestore"
import { getDownloadURL, ref, uploadBytes } from "firebase/storage"
import NoteModel from "../models/Note.model"
import { db, storage, timestamp } from "./firebase"

export const deleteItems = async (items) => {
  const batch = writeBatch(db)

  items.forEach(item => {
    const ref = doc(db, `${item.type}s/${item.id}`)
    batch.delete(ref)
  })

  await batch.commit()
}

export const changeItemColors = async (items, color: string) => {
  const batch = writeBatch(db)

  items.forEach(item => {
    const ref = doc(db, `${item.type}s/${item.id}`)
    batch.update(ref, { color: color })
  })

  await batch.commit()
}

export const pinItems = async (items) => {
  const batch = writeBatch(db)

  items.forEach(item => {
    const ref = doc(db, `${item.type}s/${item.id}`)
    batch.update(ref, { pinned: !item.pinned })
  })

  await batch.commit()
}

export const addItemsToFolder = async (items, path: string) => {
  const batch = writeBatch(db)

  items.forEach(item => {
    const ref = doc(db, `${item}s/${item.id}`)
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