import React, { useContext, createContext, useReducer, useEffect } from "react";
import { useAuth } from "contexts/auth-context";
import { useLoader } from "contexts/loader-context";

import {
    initialState,
    playlistsReducerFunction,
    PlaylistState,
} from "reducer-functions/PlaylistReducer/playlistsReducer";

import {
    loadPlaylists,
    resetPlaylists,
} from "utility-functions/playlistHandler";
import { PlaylistActions } from "reducer-functions/PlaylistReducer/playlistActionTypes";

interface PlaylistsContextValue {
    playlistsState: PlaylistState;
    playlistsDispatch: React.Dispatch<PlaylistActions>;
}

const PlaylistsContext = createContext<PlaylistsContextValue>({
    playlistsState: initialState,
    playlistsDispatch: () => {},
});

export const PlaylistProvider: React.FC<React.PropsWithChildren> = ({
    children,
}) => {
    const [playlistsState, playlistsDispatch] = useReducer(
        playlistsReducerFunction,
        initialState
    );

    const { authState } = useAuth();
    const { showLoader, hideLoader } = useLoader();

    useEffect(() => {
        (async () => {
            authState.isLoggedIn
                ? loadPlaylists(
                      authState.token,
                      playlistsDispatch,
                      showLoader,
                      hideLoader
                  )
                : resetPlaylists(playlistsDispatch);
        })();
    }, [authState, showLoader, hideLoader]);

    return (
        <PlaylistsContext.Provider
            value={{ playlistsState, playlistsDispatch }}>
            {children}
        </PlaylistsContext.Provider>
    );
};

export const usePlaylists = () => useContext(PlaylistsContext);
