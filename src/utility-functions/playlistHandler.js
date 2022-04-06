import axios from "axios";

export const loadPlaylists = async (
    token,
    playlistsDispatch,
    showLoader,
    hideLoader
) => {
    try {
        showLoader("Getting Playlists");
        const {
            data: { playlists },
            playlistsStatus,
        } = await axios.get("/api/user/playlists", {
            headers: {
                authorization: token,
            },
        });

        playlistsDispatch({
            type: "LOAD_PLAYLISTS",
            payload: playlists,
        });
    } catch (error) {
        console.log(error);
    } finally {
        hideLoader();
    }
};
export const resetPlaylists = (playlistsDispatch) =>
    playlistsDispatch({ type: "RESET_PLAYLISTS" });

export const inPlaylist = (playlist, video) =>
    playlist.videos.findIndex(
        (playlistVideo) => playlistVideo._id === video._id
    ) !== -1;
export const playlistNameExists = (playlists, name) =>
    playlists.findIndex(({ title }) => title === name) !== -1;
export const createPlaylist = async (
    token,
    playlistData,
    playlistsDispatch,
    showLoader,
    hideLoader
) => {
    try {
        showLoader("Creating New PLaylist");
        const {
            data: { playlists },
            playlistsStatus,
        } = await axios.post("/api/user/playlists", playlistData, {
            headers: {
                authorization: token,
            },
        });

        playlistsDispatch({ type: "SET_PLAYLISTS", payload: playlists });
    } catch (error) {
        console.log(error);
    } finally {
        hideLoader();
    }
};

export const deletePlaylist = async (
    token,
    playlist,
    playlistsDispatch,
    showLoader,
    hideLoader
) => {
    try {
        showLoader("Deleting Playlist");
        const {
            data: { playlists },
            playlistsStatus,
        } = await axios.delete(`/api/user/playlists/${playlist._id}`, {
            headers: {
                authorization: token,
            },
        });
        playlistsDispatch({ type: "SET_PLAYLISTS", payload: playlists });
    } catch (error) {
        console.log(error);
    } finally {
        hideLoader();
    }
};

export const addToPlaylist = async (
    token,
    video,
    playlistData,
    playlistsDispatch,
    showLoader,
    hideLoader
) => {
    try {
        showLoader("Adding To Playlist");
        const {
            data: { playlist },
            playlistsStatus,
        } = await axios.post(
            `/api/user/playlists/${playlistData._id}`,
            { video },
            {
                headers: {
                    authorization: token,
                },
            }
        );

        playlistsDispatch({ type: "SET_PLAYLIST", payload: playlist });
    } catch (error) {
        console.log(error);
    } finally {
        hideLoader();
    }
};

export const removeFromPlaylist = async (
    token,
    video,
    playlistData,
    playlistsDispatch,
    showLoader,
    hideLoader
) => {
    try {
        showLoader("Removing To Playlist");
        const {
            data: { playlist },
            playlistsStatus,
        } = await axios.delete(
            `/api/user/playlists/${playlistData._id}/${video._id}`,
            {
                headers: {
                    authorization: token,
                },
            }
        );

        playlistsDispatch({ type: "SET_PLAYLIST", payload: playlist });
    } catch (error) {
        console.log(error);
    } finally {
        hideLoader();
    }
};

export const closePlaylistsModal = (playlistsDispatch) =>
    playlistsDispatch({ type: "CLOSE_MODAL" });

export const openPlaylistsModal = (video, playlistsDispatch) =>
    playlistsDispatch({ type: "OPEN_MODAL", payload: video });
