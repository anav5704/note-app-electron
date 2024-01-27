import { DraggableBar, MainContent, SideBar } from "./components"
import icons from "./assets/icons.svg"
import { useRef } from "react"
import { MarkdownEditor } from "./components/markdown-editor"

function App(): JSX.Element {
    const contentRef = useRef<HTMLDivElement>(null)

    const resetScroll = () => {
        contentRef.current?.scrollTo(0, 0)
    }


    return (
        <main className="h-screen" >
            <DraggableBar />
            <div className="flex h-full w-full">
                <SideBar className="bg-zinc-900" onSelect={resetScroll} />
                <MainContent ref={contentRef} className="bg-zinc-900">
                    <MarkdownEditor />
                </MainContent>
            </div>
        </main>
    )
}

export default App
