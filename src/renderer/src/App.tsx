import { DraggableBar, MainContent, SideBar } from "./components"
import icons from "./assets/icons.svg"

function App(): JSX.Element {
    return (
        <>
            <DraggableBar />
            <main className="flex h-full">
                <SideBar className="bg-zinc-900">sidebar</SideBar>
                <MainContent className="bg-zinc-950 grow">main content</MainContent>
            </main>
        </>
    )
}

export default App
