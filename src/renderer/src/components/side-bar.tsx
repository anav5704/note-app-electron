import { cn } from '@renderer/utils'
import { Trash, Trash2 } from 'lucide-react'
import React from 'react'

interface SideBarProps {
    className?: string
}

const notes = [
    {
        title: "How to Prepare for University",
        createdAt: "Thur Jun 5"
    },
    {
        title: "How to Make Friends in University",
        createdAt: "Thur Jun 6"
    },
    {
        title: "How Drop out of University",
        createdAt: "Thur Jun 6"
    },
]

export const SideBar = ({ className }: SideBarProps) => {
    return (
        <aside className={cn("w-[200px]", className)}>
            <h1 className='p-2'>Your Notes</h1>
            {notes.map((note, index) => (
                <div className='text-xs group border-b last-of-type:border-none border-zinc-800 flex items-center justify-between' key={index}>
                    <div className='p-2'>
                        <p className='line-clamp-1'>{note.title}</p>
                        <p className='opacity-25 font-light'>{note.createdAt}</p>
                    </div>
                    <div className='cursor-pointer p-2 opacity-0 group-hover:opacity-100 transition'>
                        <Trash2 className='h-4 w-4 text-zinc-600'/>
                    </div>
                </div>
            ))}
        </aside>
    )
}
