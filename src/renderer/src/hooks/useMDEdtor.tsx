import { MDXEditorMethods } from "@mdxeditor/editor"
import { saveNoteAtom, selectedNoteAtom } from "@renderer/store"
import { NoteContent } from "@shared/types"
import { useAtomValue, useSetAtom } from "jotai"
import { throttle } from "lodash"
import { useRef } from "react"

export const useMDEditor = () => {
    const selectedNote = useAtomValue(selectedNoteAtom)
    const saveNote = useSetAtom(saveNoteAtom)
    const editorRef = useRef<MDXEditorMethods>(null)

    const handleAutoSave = throttle(async (content: NoteContent) => {
        if (!selectedNote) return
        await saveNote(content)
    }, 3000, { leading: false, trailing: true })

    const handleBlur = async () => {
        if (!selectedNote) return
        handleAutoSave.cancel()

        const content = editorRef.current?.getMarkdown()
        if (content != null) {
            await saveNote(content)
        }
    }

    return { selectedNote, editorRef, handleAutoSave,handleBlur }
}