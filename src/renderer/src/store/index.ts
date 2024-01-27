import { Note } from "@shared/models/note"
import { atom } from "jotai"



const mockData = [
  {
    title: "Mahoraga Stats",
    content: "Content note 1",
    updatedAt: new Date().getTime()
  },
  {
    title: "Sukuna Stats",
    content: "Content note 2",
    updatedAt: new Date().getTime()
  }
]

export const notesAtom = atom<Note[]>(mockData)

export const selectedNoteIndexAtom = atom<number | null>(null)

export const selectedNoteAtom = atom((get) => {
  const notes = get(notesAtom)
  const selectedNoteIndex = get(selectedNoteIndexAtom)

  if (selectedNoteIndex === null) return null

  const selectedNote = notes[selectedNoteIndex]

  return { ...selectedNote, content: `Hello from note ${selectedNoteIndex}` }
})
