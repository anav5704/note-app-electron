import { contextBridge, ipcRenderer } from "electron"
import { GetNotes } from "@shared/types"

if (!process.contextIsolated) {
  throw new Error("Context isolation must be enabled")
}

try {
  contextBridge.exposeInMainWorld("context", {
    getNotes: (...args: Parameters<GetNotes>) => ipcRenderer.invoke("getNotes", ...args)  
  })
} catch (error) {
  console.log(error)
}
