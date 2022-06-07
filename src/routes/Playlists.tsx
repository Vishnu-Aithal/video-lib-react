import { Playlist } from "components/Playlist";
import { useState } from "react";
import { useParams } from "react-router-dom";
import { usePlaylists } from "contexts/playlist-context";
import { useAuth } from "contexts/auth-context";
import { useLoader } from "contexts/loader-context";
import "styles/playlists.css";
import { Card } from "components/Card";
import {
    createPlaylist,
    playlistNameExists,
} from "utility-functions/playlistHandler";

export const Playlists = () => {
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
    return (
        <>
            <div className="playlists-container p-2">
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
                        onClick={() => {
                            newPlaylistName &&
                                createPlaylist(
                                    token,
                                    {
                                        playlist: {
                                            title: newPlaylistName,
                                        },
                                    },
                                    playlistsDispatch,
                                    showLoader,
                                    hideLoader
                                );
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
