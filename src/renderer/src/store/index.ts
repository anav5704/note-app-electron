import { Note, NoteInfo } from "@shared/types"
import { unwrap } from "jotai/utils"
import { atom } from "jotai"

const loadNotes = async () => {
    const notes = await window.context.getNotes()
    return notes.sort((a, b) => b.updatedAt - a.updatedAt)
}

const notesAtomAsync = atom<NoteInfo[] | Promise<NoteInfo[]>>(loadNotes())

export const notesAtom = unwrap(notesAtomAsync, (prev) => prev)

export const selectedNoteIndexAtom = atom<number | null>(null)

const selectedNoteAtomAsync = atom(async (get) => {
    const notes = get(notesAtom)
    const selectedNoteIndex = get(selectedNoteIndexAtom)

    if (selectedNoteIndex === null || !notes) return null

    const selectedNote = notes[selectedNoteIndex]

    const noteContent = await window.context.readNote(selectedNote?.title)

    return { ...selectedNote, content: noteContent }
})

export const selectedNoteAtom = unwrap(selectedNoteAtomAsync, ((prev) => prev ?? {
    title: "",
    content: "",
    updatedAt: null
}))

export const createEmptyNoteAtom = atom(null, (get, set) => {
    const notes = get(notesAtom)
    if (!notes) return

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
    if (!notes) return

    const selectedNote = get(selectedNoteAtom)

    if (!selectedNote) return

    set(
        notesAtom,
        notes.filter((note) => note.title !== selectedNote.title)
    )
    set(selectedNoteIndexAtom, null)
})
