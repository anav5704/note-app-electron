import { CreateNote, GetNotes, ReadNote, WriteNote } from "@shared/types"
import { ElectronAPI } from "@electron-toolkit/preload"

declare global {
  interface Window {
    // electron: ElectronAPI
    context: {
        getNotes: GetNotes,
        readNote: ReadNote,
        writeNote: WriteNote,
        createNote: CreateNote
    }
  }
}