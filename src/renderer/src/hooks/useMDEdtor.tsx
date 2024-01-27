import { selectedNoteAtom } from "@renderer/store"
import { useAtomValue } from "jotai"

export const useMDEditor = () => {
    const selectedNote = useAtomValue(selectedNoteAtom)
    return selectedNote
}