import { DraggableBar, MainContent, SideBar } from "./components"
import icons from "./assets/icons.svg"

function App(): JSX.Element {
    return (
        <main >
            <DraggableBar />
            <div className="flex h-full w-full">
                <SideBar className="bg-zinc-900" />
                <MainContent className="bg-zinc-950 grow" />
            </div>
        </main>
    )
}

export default App
