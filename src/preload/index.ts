import { contextBridge, ipcRenderer } from "electron"
import { GetNotes, ReadNote, WriteNote } from "@shared/types"

if (!process.contextIsolated) {
    throw new Error("Context isolation must be enabled")
}

try {
    contextBridge.exposeInMainWorld("context", {
        getNotes: (...args: Parameters<GetNotes>) => ipcRenderer.invoke("getNotes", ...args),
        readNote: (...args: Parameters<ReadNote>) => ipcRenderer.invoke("readNote", ...args),
        writeNote: (...args: Parameters<WriteNote>) => ipcRenderer.invoke("writeNote", ...args)
    })
} catch (error) {
    console.log(error)
}
