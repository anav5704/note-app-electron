import { GetNotes, ReadNote, WriteNote, CreateNote } from "@shared/types"
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
    })
} catch (error) {
    console.log(error)
}
