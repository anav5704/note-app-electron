import { cn } from "@renderer/utils"
import Main from "electron/main"

interface MainContentProps {
    children: React.ReactNode,
    className?: string
}
export const MainContent = ({ children, className }: MainContentProps) => {
    return (
        <main className={cn("", className)}>
            {children}
        </main>
    )
}
