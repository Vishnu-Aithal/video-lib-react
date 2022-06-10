import { useAuth } from "contexts/auth-context";
import { useLoader } from "contexts/loader-context";
import { usePlaylists } from "contexts/playlist-context";
import { useToast } from "contexts/toast-context";
import { useUserData } from "contexts/user-context";
import { PlaylistType } from "types/Playlist";
import { VideoDetails } from "types/VideoDetails";
import { removeFromPlaylist } from "utility-functions/playlistHandler";
import {
    removeFromHistory,
    removeFromLikes,
    removeFromWatchlater,
} from "utility-functions/userHandler";

interface OtherCardDismissProps {
    type: "liked" | "history" | "later" | "listing";
    data: VideoDetails;
}
interface PlaylistCardDismissProps {
    type: "playlist";
    data: VideoDetails;
    playlistData: PlaylistType;
}

type CardDismissProps = OtherCardDismissProps | PlaylistCardDismissProps;

export const CardDismiss: React.FC<CardDismissProps> = (props) => {
    const { type, data } = props;
    const { userDispatch } = useUserData();
    const { showLoader, hideLoader } = useLoader();
    const { showToast } = useToast();
    const {
        authState: { token },
    } = useAuth();
    const { playlistsDispatch } = usePlaylists();

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
            {" "}
            {type === "liked" && (
                <div
                    className="card__dismiss"
                    onClick={async () => {
                        const error = await removeFromLikes(
                            token!,
                            data,
                            userDispatch,
                            showLoader,
                            hideLoader
                        );
                        handleError(
                            error,
                            "Removed from likes",
                            "Failed to remove from likes"
                        );
                    }}>
                    <i className="fas fa-heart clr-red"></i>
                </div>
            )}
            {type === "history" && (
                <div
                    className="card__dismiss"
                    onClick={async () => {
                        const error = await removeFromHistory(
                            token!,
                            data,
                            userDispatch,
                            showLoader,
                            hideLoader
                        );
                        handleError(
                            error,
                            "Removed from history",
                            "Failed to remove from history"
                        );
                    }}>
                    <i className="far fa-trash-alt clr-white"></i>
                </div>
            )}
            {type === "later" && (
                <div
                    className="card__dismiss"
                    onClick={async () => {
                        const error = await removeFromWatchlater(
                            token!,
                            data,
                            userDispatch,
                            showLoader,
                            hideLoader
                        );
                        handleError(
                            error,
                            "Removed from WatchLater",
                            "Failed to remove from WatchLater"
                        );
                    }}>
                    <i className="far fa-trash-alt clr-white"></i>
                </div>
            )}
            {type === "playlist" && (
                <div
                    className="card__dismiss"
                    onClick={async () => {
                        const error = await removeFromPlaylist(
                            token!,
                            data,
                            props.playlistData,
                            playlistsDispatch,
                            showLoader,
                            hideLoader
                        );
                        handleError(
                            error,
                            `Removed from Playlist ${props.playlistData.title}`,
                            "Failed to remove from playlist"
                        );
                    }}>
                    <i className="far fa-trash-alt clr-white"></i>
                </div>
            )}
        </>
    );
};
