import { contextBridge } from "electron"
import { electronAPI } from "@electron-toolkit/preload"

if (!process.contextIsolated) {
  throw new Error("Context isolation must be enabled")
}

try {
  contextBridge.exposeInMainWorld("context", {
    // TODO
  })
} catch (error) {
  console.log(error)
}
