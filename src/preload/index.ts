import { GetNotes, ReadNote, WriteNote, CreateNote, DeleteNote } from "@shared/types"
import { contextBridge, ipcRenderer } from "electron"

if (!process.contextIsolated) {
    throw new Error("Context isolation must be enabled")
}

try {
    contextBridge.exposeInMainWorld("context", {
        getNotes: (...args: Parameters<GetNotes>) => ipcRenderer.invoke("getNotes", ...args),
        readNote: (...args: Parameters<ReadNote>) => ipcRenderer.invoke("readNote", ...args),
        writeNote: (...args: Parameters<WriteNote>) => ipcRenderer.invoke("writeNote", ...args),
        createNote: (...args: Parameters<CreateNote>) => ipcRenderer.invoke("createNote", ...args),
        deleteNote: (...args: Parameters<DeleteNote>) => ipcRenderer.invoke("deleteNote", ...args),
    })
} catch (error) {
    console.log(error)
}
