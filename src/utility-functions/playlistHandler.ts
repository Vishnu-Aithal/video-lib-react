import axios from "axios";
import { HideLoader, ShowLoader } from "contexts/loader-context";
import React from "react";
import { PlaylistActions } from "reducer-functions/PlaylistReducer/playlistActionTypes";
import { PlaylistType } from "types/Playlist";
import { VideoDetails } from "types/VideoDetails";

export const loadPlaylists = async (
    token: string,
    playlistsDispatch: React.Dispatch<PlaylistActions>,
    showLoader: ShowLoader,
    hideLoader: HideLoader
) => {
    try {
        showLoader("Getting Playlists");
        const {
            data: { playlists },
        } = await axios.get(
            `https://${process.env.REACT_APP_BACKEND_URL}/api/user/playlists`,
            {
                headers: {
                    authorization: token,
                },
            }
        );

        playlistsDispatch({
            type: "LOAD_PLAYLISTS",
            payload: playlists,
        });
    } catch (error) {
        return error;
    } finally {
        hideLoader();
    }
};
export const resetPlaylists = (
    playlistsDispatch: React.Dispatch<PlaylistActions>
) => playlistsDispatch({ type: "RESET_PLAYLISTS" });

export const inPlaylist = (
    playlist: PlaylistType,
    video: VideoDetails | {}
) => {
    if ("_id" in video) {
        return (
            playlist.videos.findIndex(
                (playlistVideo) => playlistVideo._id === video._id
            ) !== -1
        );
    }
};

export const playlistNameExists = (playlists: PlaylistType[], name: string) =>
    playlists.findIndex(({ title }) => title === name) !== -1;

export const createPlaylist = async (
    token: string,
    playlistData: Partial<PlaylistType>,
    playlistsDispatch: React.Dispatch<PlaylistActions>,
    showLoader: ShowLoader,
    hideLoader: HideLoader
) => {
    try {
        showLoader("Creating New PLaylist");
        const {
            data: { playlists },
        } = await axios.post(
            `https://${process.env.REACT_APP_BACKEND_URL}/api/user/playlists`,
            { playlist: playlistData },
            {
                headers: {
                    authorization: token,
                },
            }
        );

        playlistsDispatch({ type: "SET_PLAYLISTS", payload: playlists });
    } catch (error) {
        return error;
    } finally {
        hideLoader();
    }
};

export const deletePlaylist = async (
    token: string,
    playlist: PlaylistType,
    playlistsDispatch: React.Dispatch<PlaylistActions>,
    showLoader: ShowLoader,
    hideLoader: HideLoader
) => {
    try {
        showLoader("Deleting Playlist");
        const {
            data: { playlists },
        } = await axios.delete(
            `https://${process.env.REACT_APP_BACKEND_URL}/api/user/playlists/${playlist._id}`,
            {
                headers: {
                    authorization: token,
                },
            }
        );
        playlistsDispatch({ type: "SET_PLAYLISTS", payload: playlists });
    } catch (error) {
        return error;
    } finally {
        hideLoader();
    }
};

export const addToPlaylist = async (
    token: string,
    video: VideoDetails,
    playlistData: PlaylistType,
    playlistsDispatch: React.Dispatch<PlaylistActions>,
    showLoader: ShowLoader,
    hideLoader: HideLoader
) => {
    try {
        showLoader("Adding To Playlist");
        const {
            data: { playlist },
        } = await axios.post(
            `https://${process.env.REACT_APP_BACKEND_URL}/api/user/playlists/${playlistData._id}`,
            { video },
            {
                headers: {
                    authorization: token,
                },
            }
        );

        playlistsDispatch({ type: "SET_PLAYLIST", payload: playlist });
    } catch (error) {
        return error;
    } finally {
        hideLoader();
    }
};

export const removeFromPlaylist = async (
    token: string,
    video: VideoDetails,
    playlistData: PlaylistType,
    playlistsDispatch: React.Dispatch<PlaylistActions>,
    showLoader: ShowLoader,
    hideLoader: HideLoader
) => {
    try {
        showLoader("Removing To Playlist");
        const {
            data: { playlist },
        } = await axios.delete(
            `https://${process.env.REACT_APP_BACKEND_URL}/api/user/playlists/${playlistData._id}/${video._id}`,
            {
                headers: {
                    authorization: token,
                },
            }
        );

        playlistsDispatch({ type: "SET_PLAYLIST", payload: playlist });
    } catch (error) {
        return error;
    } finally {
        hideLoader();
    }
};

export const closePlaylistsModal = (
    playlistsDispatch: React.Dispatch<PlaylistActions>
) => playlistsDispatch({ type: "CLOSE_MODAL" });

export const openPlaylistsModal = (
    video: VideoDetails,
    playlistsDispatch: React.Dispatch<PlaylistActions>
) => playlistsDispatch({ type: "OPEN_MODAL", payload: video });
