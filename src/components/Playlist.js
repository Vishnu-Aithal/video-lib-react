import { NavLink } from "react-router-dom";

export const Playlist = ({
    playlistData = { _id: "adifsuh378qf", title: "My Playlist", videos: [] },
}) => {
    return (
        <NavLink
            className={({ isActive }) =>
                `playlist p-2 m-4 btn--link clr-black br-2 ${
                    isActive ? "bg-secondary-light" : "bg-light-gray"
                } `
            }
            to={`/playlists/${playlistData._id}`}>
            <div className="playlist__detail">
                <h4 className="playlist__title">{playlistData.title}</h4>
                <p className="playlist__description">{`${playlistData.videos.length} Videos`}</p>
            </div>
            <button className="playlist__delete btn bg-light-gray btn--icon br-2 ms-4">
                <i className="far fa-trash-alt clr-red"></i>
            </button>
        </NavLink>
    );
};
