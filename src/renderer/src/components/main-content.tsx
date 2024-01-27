import { MDXEditor, headingsPlugin, linkPlugin, listsPlugin, markdownShortcutPlugin } from "@mdxeditor/editor"
import { cn } from "@renderer/utils"
import Main from "electron/main"

interface MainContentProps {
    className?: string
}
export const MainContent = ({ className }: MainContentProps) => {
    return (
        <main className={cn(" overflow-scroll", className)}>
            <MDXEditor 
            contentEditableClassName="prose prose-h1:text-2xl leading-none prose-sm prose-invert outline-none min-h-screen max-w-none text-md p-3" 
            plugins={[headingsPlugin(), listsPlugin(), markdownShortcutPlugin()]}
            markdown={"# Hello World"}
            />
        </main>
    )
}

