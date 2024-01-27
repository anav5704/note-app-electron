import { FilePlus2, Plus, Trash2 } from 'lucide-react'
import { cn } from '@renderer/utils'
import { useNoteList } from '@renderer/hooks/useNoteList'
import { useSetAtom } from 'jotai'
import { createEmptyNoteAtom, deleteNoteAtom } from '@renderer/store'

interface SideBarProps {
    className?: string,
    onSelect: () => void
}

export const SideBar = ({ className, onSelect }: SideBarProps) => {
    const { notes, selectedNoteIndex, handleNoteSelect } = useNoteList({ onSelect })
    const createEmptyNote = useSetAtom(createEmptyNoteAtom)
    const deleteNote = useSetAtom(deleteNoteAtom)

    const handleCreate = () => {
        createEmptyNote()
    }

    const handleDelete = () => {
        deleteNote()
    }

    return (
        <aside className={cn("w-[200px] border-r border-zinc-800 ", className)}>
            <div className='text-xs group border-b last-of-type:border-none border-zinc-800'>
                <div onClick={handleCreate} className='cursor-pointer p-4 grid place-content-center w-full'>
                    <Plus className='h-4 w-4 text-zinc-600' />
                </div>
            </div>
            {notes.map((note, index) => (
                <div onClick={() => handleNoteSelect(index)} className='text-xs group border-b last-of-type:border-none border-zinc-800 flex items-center justify-between' key={index}>
                    <div className='p-2'>
                        <p className='line-clamp-1'>{note.title}</p>
                        <p className='opacity-25 font-light'>{note.updatedAt}</p>
                    </div>
                    <div onClick={handleDelete} className='transition cursor-pointer p-2 opacity-0 group-hover:opacity-100'>
                        <Trash2 className='h-4 w-4 text-zinc-600' />
                    </div>
                </div>
            ))}
        </aside>
    )
}
