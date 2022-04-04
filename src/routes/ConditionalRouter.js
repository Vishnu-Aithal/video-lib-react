import App from "App";
import { Routes, Route } from "react-router-dom";
import { useAuth } from "contexts/auth-context";
import {
    HomePage,
    Browse,
    LikedVideos,
    History,
    WatchLater,
    Playlists,
    SignIn,
    SignUp,
} from "routes";

export const ConditionalRouter = () => {
    const {
        authState: { isLoggedIn },
    } = useAuth();
    console.log(isLoggedIn);
    return (
        <Routes>
            <Route path="/" element={<App />}>
                <Route index element={<HomePage />} />
                <Route path="/browse/:category" element={<Browse />} />
                <Route
                    path="/liked-videos"
                    element={isLoggedIn ? <LikedVideos /> : <SignIn />}
                />

                <Route
                    path="/history"
                    element={isLoggedIn ? <History /> : <SignIn />}
                />
                <Route
                    path="/watch-later"
                    element={isLoggedIn ? <WatchLater /> : <SignIn />}
                />
                <Route
                    path="/playlists/:playlist"
                    element={isLoggedIn ? <Playlists /> : <SignIn />}
                />
                <Route
                    path="/sign-in"
                    element={isLoggedIn ? <Browse /> : <SignIn />}
                />
                <Route
                    path="/sign-up"
                    element={isLoggedIn ? <Browse /> : <SignUp />}
                />
            </Route>
        </Routes>
    );
};
