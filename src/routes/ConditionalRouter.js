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
    NotFound,
} from "routes";
import { ProtectedAuth, ProtectedRoute } from "./ProtectedRoute";

export const ConditionalRouter = () => {
    const {
        authState: { isLoggedIn },
    } = useAuth();
    return (
        <Routes>
            <Route path="/" element={<App />}>
                <Route index element={<HomePage />} />
                <Route path="/browse/:category" element={<Browse />} />
                <Route element={<ProtectedRoute isLoggedIn={isLoggedIn} />}>
                    <Route path="/liked-videos" element={<LikedVideos />} />
                    <Route path="/history" element={<History />} />
                    <Route path="/watch-later" element={<WatchLater />} />
                    <Route
                        path="/playlists/:playlist"
                        element={<Playlists />}
                    />
                </Route>
                <Route element={<ProtectedAuth isLoggedIn={isLoggedIn} />}>
                    <Route path="/sign-in" element={<SignIn />} />
                    <Route path="/sign-up" element={<SignUp />} />
                </Route>
            </Route>
            <Route path="*" element={<NotFound />} />
        </Routes>
    );
};
