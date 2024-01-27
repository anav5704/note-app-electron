import { GetNotes, NoteInfo } from "@shared/types"
import { ensureDir, readdir, stat } from "fs-extra"
import { homedir } from "os"

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

const getFileInfo = async (fileName: string): Promise<NoteInfo> => {
    const fileStats = await stat(`${getRootDir()}/${fileName}`)

    return {
        title: fileName.replace(/\.md$/, ""),
        updatedAt: fileStats.mtimeMs
    }
}