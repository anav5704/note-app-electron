import { cn } from '@renderer/utils'
import React from 'react'

interface SideBarProps {
    children: React.ReactNode,
    className?: string
}

export const SideBar = ({ children, className }: SideBarProps) => {
    return (
        <aside className={cn("w-[200px]", className)}>
            {children}
        </aside>
    )
}
