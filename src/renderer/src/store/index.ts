import { Note, NoteInfo } from "@shared/types"
import { unwrap } from "jotai/utils"
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

const loadNotes = async () => {
    const notes = await window.context.getNotes()
    return notes.sort((a, b) => b.updatedAt - a.updatedAt)
}

const notesAtomAsync = atom<NoteInfo[] | Promise<NoteInfo[]>>(loadNotes())

export const notesAtom = unwrap(notesAtomAsync, (prev) => prev)

export const selectedNoteIndexAtom = atom<number | null>(null)

export const selectedNoteAtom = atom((get) => {
    const notes = get(notesAtom)
    const selectedNoteIndex = get(selectedNoteIndexAtom)

    if (selectedNoteIndex === null || !notes) return null

    const selectedNote = notes[selectedNoteIndex]

    return { ...selectedNote, content: `Hello from note ${selectedNoteIndex}` }
})

export const createEmptyNoteAtom = atom(null, (get, set) => {
    const notes = get(notesAtom)
    if(!notes) return

    const title = `Title for note ${notes.length + 1}`

    const newNote: Note = {
        title,
        content: "",
        updatedAt: Date.now()
    }

    set(notesAtom, [newNote, ...notes.filter((note) => note.title !== newNote.title)])
    set(selectedNoteIndexAtom, 0)
})

export const deleteNoteAtom = atom(null, (get, set) => {
    const notes = get(notesAtom)
    if(!notes) return
    
    const selectedNote = get(selectedNoteAtom)

    if (!selectedNote) return

    set(
        notesAtom,
        notes.filter((note) => note.title !== selectedNote.title)
    )
    set(selectedNoteIndexAtom, null)
})
