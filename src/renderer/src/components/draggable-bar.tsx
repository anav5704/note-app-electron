import { selectedNoteAtom } from '@renderer/store'
import { useAtomValue } from 'jotai'
import React from 'react'

export const DraggableBar = () => {
    const selectedNote = useAtomValue(selectedNoteAtom)

    return (
        <header className="bg-zinc-900 font-light inset-0 h-8 border-b border-zinc-800 grid place-content-center">
            {selectedNote ? selectedNote.title : "⚡"}
        </header>
    )
}
