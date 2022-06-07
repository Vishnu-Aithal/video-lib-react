import { useContext, createContext, useReducer, useEffect } from "react";
import { useAuth } from "contexts/auth-context";
import { useLoader } from "contexts/loader-context";

import {
    initialState,
    playlistsReducerFunction,
} from "reducer-functions/playlistsReducer";

import {
    loadPlaylists,
    resetPlaylists,
} from "utility-functions/playlistHandler";

const PlaylistsContext = createContext();

export const PlaylistProvider = ({ children }) => {
    const [playlistsState, playlistsDispatch] = useReducer(
        playlistsReducerFunction,
        initialState
    );

    const {
        authState: { isLoggedIn, token },
    } = useAuth();
    const { showLoader, hideLoader } = useLoader();

    useEffect(() => {
        (async () => {
            isLoggedIn
                ? loadPlaylists(
                      token,
                      playlistsDispatch,
                      showLoader,
                      hideLoader
                  )
                : resetPlaylists(playlistsDispatch);
        })();
    }, [isLoggedIn]);

    return (
        <PlaylistsContext.Provider
            value={{ playlistsState, playlistsDispatch }}>
            {children}
        </PlaylistsContext.Provider>
    );
};

export const usePlaylists = () => useContext(PlaylistsContext);
