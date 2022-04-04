import "./App.css";
import { TopNav } from "components/TopNav";
import { Outlet } from "react-router-dom";
import { SideBar } from "components/SideBar";
import { Loader } from "components/Loader";

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
            </main>
        </div>
    );
}

export default App;
