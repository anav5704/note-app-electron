export type Note = {
  title: string
  content: string
  updatedAt: number
}

export type NoteInfo = {
  title: string
  updatedAt: number 
}

export type GetNotes = () => Promise<NoteInfo[]>
