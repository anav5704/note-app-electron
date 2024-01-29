import { CreateNote, DeleteNote, GetNotes, NoteInfo, ReadNote, WriteNote } from "@shared/types"
import { dialog } from "electron"
import { ensureDir, readFile, readdir, remove, stat, writeFile } from "fs-extra"
import { homedir } from "os"
import path, { join } from "path"

export const getRootDir = () => {
    return `${homedir()}/notes`
}

export const getNotes: GetNotes = async () => {
    const rootDir = getRootDir()
    await ensureDir(rootDir)

    const notesFileNames = await readdir(rootDir, {
        encoding: "utf-8",
        withFileTypes: false
    })

    const notes = notesFileNames.filter((fileName) => fileName.endsWith(".md"))
    return Promise.all(notes.map(getFileInfo))
}

export const getFileInfo = async (fileName: string): Promise<NoteInfo> => {
    const fileStats = await stat(`${getRootDir()}/${fileName}`)

    return {
        title: fileName.replace(/\.md$/, ""),
        updatedAt: fileStats.mtimeMs
    }
}

export const readNote: ReadNote = async (fileName: string) => {
    const rootDir = getRootDir()
    return readFile(`${rootDir}/${fileName}.md`, { encoding: "utf-8" })
}

export const writeNote: WriteNote = async (fileName, content) => {
    const rootDir = getRootDir()
    writeFile(`${rootDir}/${fileName}.md`, content, { encoding: "utf-8" })
}

export const createNote: CreateNote = async () => {
    const rootDir = getRootDir()

    await ensureDir(rootDir)

    const { filePath, canceled } = await dialog.showSaveDialog({
        title: "New Note",
        defaultPath: join(rootDir, 'Untitled.md'),
        buttonLabel: "Create",
        properties: ['showOverwriteConfirmation'],
        showsTagField: false,
        filters: [{ name: "Markdown", extensions: ["md"] }]
    })

    if (canceled || !filePath) return false

    const { name: fileName } = path.parse(filePath)

    await writeFile(filePath, "")
    return fileName
}

export const deleteNote: DeleteNote = async (fileName) => {
    const rootDir = getRootDir()

    const { response } = await dialog.showMessageBox({
        type: "warning",
        title: "Delete Note",
        message: `Are you sure you want to delete ${fileName}?`,
        buttons: ["Delete", "Cancel"],
        defaultId: 1,
        cancelId: 1,
    })

    if (response === 1) return false

    await remove(`${rootDir}/${fileName}.md`)

    return true
}