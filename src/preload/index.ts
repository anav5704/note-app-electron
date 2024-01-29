import { contextBridge, ipcRenderer } from "electron"
import { GetNotes, ReadNote } from "@shared/types"

if (!process.contextIsolated) {
    throw new Error("Context isolation must be enabled")
}

try {
    contextBridge.exposeInMainWorld("context", {
        getNotes: (...args: Parameters<GetNotes>) => ipcRenderer.invoke("getNotes", ...args),
        readNote: (...args: Parameters<ReadNote>) => ipcRenderer.invoke("readNote", ...args)
    })
} catch (error) {
    console.log(error)
}
