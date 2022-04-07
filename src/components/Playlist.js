import { NavLink } from "react-router-dom";
import { deletePlaylist } from "utility-functions/playlistHandler";
import { usePlaylists } from "contexts/playlist-context";
import { useAuth } from "contexts/auth-context";
import { useLoader } from "contexts/loader-context";

export const Playlist = ({
    playlistData = { _id: "adifsuh378qf", title: "My Playlist", videos: [] },
}) => {
    const { playlistsDispatch } = usePlaylists();
    const {
        authState: { token },
    } = useAuth();
    const { showLoader, hideLoader } = useLoader();
    return (
        <NavLink
            className={({ isActive }) =>
                `playlist p-2 m-4 btn--link clr-black br-2 ${
                    isActive ? "bg-primary-light" : "bg-light-gray"
                } `
            }
            to={`/playlists/${playlistData._id}`}>
            <div className="playlist__detail">
                <h4 className="playlist__title">{playlistData.title}</h4>
                <p className="playlist__description">{`${playlistData.videos.length} Videos`}</p>
            </div>
            <button
                className="playlist__delete btn btn--secondary btn--icon br-2 ms-4"
                onClick={() =>
                    deletePlaylist(
                        token,
                        playlistData,
                        playlistsDispatch,
                        showLoader,
                        hideLoader
                    )
                }>
                <i className="far fa-trash-alt clr-white"></i>
            </button>
        </NavLink>
    );
};
