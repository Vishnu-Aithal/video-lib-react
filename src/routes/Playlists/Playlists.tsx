import { Playlist } from "components/Playlist/Playlist";
import { useState } from "react";
import { useParams } from "react-router-dom";
import { usePlaylists } from "contexts/playlist-context";
import { useAuth } from "contexts/auth-context";
import { useLoader } from "contexts/loader-context";
import classes from "./Playlists.module.css";
import { Card } from "components/Card/Card";
import {
    createPlaylist,
    playlistNameExists,
} from "utility-functions/playlistHandler";
import { useToast } from "contexts/toast-context";

export const Playlists: React.FC = () => {
    const {
        playlistsState: { playlists },
        playlistsDispatch,
    } = usePlaylists();
    const { playlist: currentPlaylistId } = useParams();
    const currentPlaylist = playlists.find(
        (playlist) => playlist._id === currentPlaylistId
    );
    const [newPlaylistName, setNewPlaylistName] = useState("");
    const {
        authState: { token },
    } = useAuth();
    const { showLoader, hideLoader } = useLoader();
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
        <>
            <div className={`${classes["playlists-container"]} p-2`}>
                <div className="w-100p text-end">
                    <div className="input ms-auto">
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
                    <button
                        disabled={
                            !newPlaylistName ||
                            playlistNameExists(playlists, newPlaylistName)
                        }
                        className="btn btn--primary"
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
                                    `Created New Playlist ${newPlaylistName}`,
                                    "Failed to Create new Playlist"
                                );
                            }
                            setNewPlaylistName("");
                        }}>
                        Create Playlist
                    </button>
                </div>

                {playlists.length !== 0 ? (
                    playlists.map((playlist) => (
                        <Playlist key={playlist._id} playlistData={playlist} />
                    ))
                ) : (
                    <h3 className="text-center w-100p">
                        Create New Playlists to View it Here
                    </h3>
                )}
            </div>

            <div className="video-card-container">
                {currentPlaylist &&
                    (currentPlaylist.videos.length !== 0 ? (
                        currentPlaylist.videos.map((video) => (
                            <Card
                                key={video._id}
                                type="playlist"
                                data={video}
                                playlistData={currentPlaylist}
                            />
                        ))
                    ) : (
                        <h3 className="m-2">
                            Add Videos To Playlists to View it Here
                        </h3>
                    ))}
            </div>
        </>
    );
};
