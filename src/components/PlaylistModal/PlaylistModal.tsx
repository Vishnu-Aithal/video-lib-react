import { usePlaylists } from "contexts/playlist-context";
import { useLoader } from "contexts/loader-context";
import { useAuth } from "contexts/auth-context";
import {
    addToPlaylist,
    removeFromPlaylist,
    createPlaylist,
    deletePlaylist,
    closePlaylistsModal,
    inPlaylist,
    playlistNameExists,
} from "utility-functions/playlistHandler";

import React, { useState } from "react";
import { createPortal } from "react-dom";
import { useToast } from "contexts/toast-context";

export const PlaylistModalComponent: React.FC = () => {
    const {
        playlistsState: { playlists, modalSettings },
        playlistsDispatch,
    } = usePlaylists();
    const {
        authState: { token },
    } = useAuth();
    const { showLoader, hideLoader } = useLoader();
    const [newPlaylistName, setNewPlaylistName] = useState("");
    const { showToast } = useToast();
    const handleError = (
        error: unknown,
        successMessage: string,
        errorMessage: string
    ) => {
        if (error) {
            showToast({ title: errorMessage, type: "error" });
        } else {
            showToast({ title: successMessage, type: "success" });
        }
    };
    return (
        <div
            className="modal"
            onClick={(e) => {
                const target = e.target as HTMLDivElement;
                target.classList.contains("modal") &&
                    closePlaylistsModal(playlistsDispatch);
            }}
            style={{
                display: modalSettings.modalOpen ? "flex" : "none",
            }}>
            <div className="modal__body bg-white br-2">
                <div className="modal__header px-3 py-1">
                    <h2 className="modal__title">Playlists</h2>
                    <button
                        className="modal__dismiss btn btn--icon dismiss"
                        onClick={() => closePlaylistsModal(playlistsDispatch)}>
                        <i className="fas fa-times"></i>
                    </button>
                </div>
                <ul className="list-group list-group--spaced w-100p">
                    {playlists.map((playlist) => (
                        <li
                            key={playlist._id}
                            className="list__item d-flex mx-auto my-1">
                            <label className=" w-100p my-1">
                                <input
                                    type="checkbox"
                                    checked={inPlaylist(
                                        playlist,
                                        modalSettings.currentVideo
                                    )}
                                    onChange={async (e) => {
                                        if (modalSettings.modalOpen) {
                                            if (e.target.checked) {
                                                const error =
                                                    await addToPlaylist(
                                                        token!,
                                                        modalSettings.currentVideo,
                                                        playlist,
                                                        playlistsDispatch,
                                                        showLoader,
                                                        hideLoader
                                                    );
                                                handleError(
                                                    error,
                                                    `Added to Playlist ${playlist.title}`,
                                                    "Failed to add to Playlist"
                                                );
                                            } else {
                                                const error =
                                                    await removeFromPlaylist(
                                                        token!,
                                                        modalSettings.currentVideo,
                                                        playlist,
                                                        playlistsDispatch,
                                                        showLoader,
                                                        hideLoader
                                                    );
                                                handleError(
                                                    error,
                                                    `Removed from Playlist ${playlist.title}`,
                                                    "Failed to remove from Playlist"
                                                );
                                            }
                                        }
                                    }}></input>{" "}
                                {playlist.title}
                            </label>
                            <button
                                className="btn btn--icon btn--secondary br-2 ms-auto"
                                onClick={async () => {
                                    const error = await deletePlaylist(
                                        token!,
                                        playlist,
                                        playlistsDispatch,
                                        showLoader,
                                        hideLoader
                                    );
                                    handleError(
                                        error,
                                        `Deleted Playlist ${playlist.title}`,
                                        "Failed to delete Playlist"
                                    );
                                }}>
                                <i className="far fa-trash-alt clr-black"></i>
                            </button>
                        </li>
                    ))}
                </ul>
                <div className="input mt-1 mx-auto">
                    <input
                        type="text"
                        value={newPlaylistName}
                        onChange={(e) => setNewPlaylistName(e.target.value)}
                        className="input__field"
                        placeholder="New Playlist Name"></input>
                    <label className="input__float-label">
                        New Playlist Name
                    </label>
                    <span className="input__required-text"></span>
                </div>

                <div className="modal__cta-wrapper p-2 mt-auto text-end">
                    <button
                        disabled={
                            !newPlaylistName ||
                            playlistNameExists(playlists, newPlaylistName)
                        }
                        className="btn btn--primary br-1"
                        onClick={async () => {
                            if (newPlaylistName) {
                                const error = await createPlaylist(
                                    token!,
                                    {
                                        title: newPlaylistName,
                                    },
                                    playlistsDispatch,
                                    showLoader,
                                    hideLoader
                                );
                                handleError(
                                    error,
                                    `Created new Playlist ${newPlaylistName}`,
                                    "Failed to create new Playlist"
                                );
                            }
                            setNewPlaylistName("");
                        }}>
                        Create New Playlist
                    </button>
                </div>
            </div>
        </div>
    );
};

export const PlaylistModal: React.FC = () => {
    return createPortal(
        <PlaylistModalComponent />,
        document.getElementById("playlist-modal") as HTMLDivElement
    );
};
