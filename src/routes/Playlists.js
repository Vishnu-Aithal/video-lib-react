import { Playlist } from "components/Playlist";
import "styles/playlists.css";

export const Playlists = () => {
    return (
        <>
            <div className="playlists-container">
                <Playlist />
                <Playlist />
                <Playlist />
                <Playlist />
            </div>

            <div className="video-card-conatiner"></div>
        </>
    );
};
