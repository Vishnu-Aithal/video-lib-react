import "./App.css";
import { TopNav } from "components/TopNav";
import { Outlet } from "react-router-dom";
import { SideBar } from "components/SideBar";
import { Loader } from "components/Loader";
import { PlaylistModal } from "components/PlaylistModal";

function App() {
    return (
        <div className="App">
            <Loader />
            <main>
                <TopNav />
                <SideBar />
                <div className="content">
                    <Outlet />
                </div>
                <PlaylistModal />
            </main>
        </div>
    );
}

export default App;
