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
export const resetPlaylists = (
    playlistsDispatch: React.Dispatch<PlaylistActions>
) => playlistsDispatch({ type: "RESET_PLAYLISTS" });

export const inPlaylist = (playlist: PlaylistType, video: VideoDetails) =>
    playlist.videos.findIndex(
        (playlistVideo) => playlistVideo._id === video._id
    ) !== -1;

export const playlistNameExists = (playlists: PlaylistType[], name: string) =>
    playlists.findIndex(({ title }) => title === name) !== -1;

export const createPlaylist = async (
    token: string,
    playlistData: PlaylistType,
    playlistsDispatch: React.Dispatch<PlaylistActions>,
    showLoader: ShowLoader,
    hideLoader: HideLoader
) => {
    try {
        showLoader("Creating New PLaylist");
        const {
            data: { playlists },
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

export const closePlaylistsModal = (
    playlistsDispatch: React.Dispatch<PlaylistActions>
) => playlistsDispatch({ type: "CLOSE_MODAL" });

export const openPlaylistsModal = (
    video: VideoDetails,
    playlistsDispatch: React.Dispatch<PlaylistActions>
) => playlistsDispatch({ type: "OPEN_MODAL", payload: video });
