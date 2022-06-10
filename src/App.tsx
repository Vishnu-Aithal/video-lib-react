import { TopNav } from "components/Layout/TopNav";
import { Outlet } from "react-router-dom";
import { SideBar } from "components/Layout/SideBar";
import { Loader } from "components/Loader/Loader";
import { PlaylistModal } from "components/PlaylistModal/PlaylistModal";
import { ToastContainer } from "components/Toast/ToastContainer";

const App: React.FC = () => {
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
                <ToastContainer />
            </main>
        </div>
    );
};

export default App;
