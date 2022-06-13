import { useLocation, useNavigate } from "react-router-dom";
import { useToast } from "contexts/toast-context";
import { openPlaylistsModal } from "utility-functions/playlistHandler";
import { usePlaylists } from "contexts/playlist-context";
import {
    addToLikes,
    addToWatchlater,
    inLikes,
    inWatchlater,
    removeFromLikes,
    removeFromWatchlater,
} from "utility-functions/userHandler";
import { useAuth } from "contexts/auth-context";
import { useUserData } from "contexts/user-context";

import classes from "./SingleVideoPage.module.css";
import { useLoader } from "contexts/loader-context";
import { VideoDetails } from "types/VideoDetails";

export const SingleVideoPageButtons: React.FC<{ videoData: VideoDetails }> = ({
    videoData,
}) => {
    const location = useLocation();
    const { playlistsDispatch } = usePlaylists();
    const { showToast } = useToast();
    const { showLoader, hideLoader } = useLoader();
    const navigate = useNavigate();
    const {
        authState: { isLoggedIn, token },
    } = useAuth();
    const {
        userState: { likes, watchlater },
        userDispatch,
    } = useUserData();

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
        <div className={classes["video-buttons"]}>
            {inLikes(likes, videoData) ? (
                <button
                    className="btn btn--icon-lg"
                    onClick={async () => {
                        const error = await removeFromLikes(
                            token!,
                            videoData,
                            userDispatch,
                            showLoader,
                            hideLoader
                        );
                        handleError(
                            error,
                            "Removed from Likes",
                            "Failed to Remove from likes"
                        );
                    }}>
                    <i className="fas fa-heart clr-red" />
                </button>
            ) : (
                <button
                    className="btn btn--icon-lg"
                    onClick={async () => {
                        if (isLoggedIn) {
                            const error = await addToLikes(
                                token!,
                                videoData,
                                userDispatch,
                                showLoader,
                                hideLoader
                            );
                            handleError(
                                error,
                                "Added to Likes",
                                "Failed to Add to Likes"
                            );
                        } else {
                            navigate("/sign-in", {
                                state: {
                                    from: location.pathname,
                                },
                            });
                        }
                    }}>
                    <i className="far fa-heart" />
                </button>
            )}

            <button
                className="btn btn--icon-lg"
                onClick={() => {
                    isLoggedIn
                        ? openPlaylistsModal(videoData, playlistsDispatch)
                        : navigate("/sign-in", {
                              state: {
                                  from: location.pathname,
                              },
                          });
                }}>
                <i className="far fa-list-alt me-2"></i>
            </button>

            {!inWatchlater(watchlater, videoData) ? (
                <button
                    className="btn btn--icon-lg"
                    onClick={async () => {
                        if (isLoggedIn) {
                            const error = await addToWatchlater(
                                token!,
                                videoData,
                                userDispatch,
                                showLoader,
                                hideLoader
                            );
                            handleError(
                                error,
                                "Added to Watch Later",
                                "Failed to Add to Watch Later"
                            );
                        } else {
                            navigate("/sign-in", {
                                state: {
                                    from: location.pathname,
                                },
                            });
                        }
                    }}>
                    <i className="far fa-bookmark me-2" />
                </button>
            ) : (
                <button
                    className="btn btn--icon-lg"
                    onClick={async () => {
                        if (isLoggedIn) {
                            const error = await removeFromWatchlater(
                                token!,
                                videoData,
                                userDispatch,
                                showLoader,
                                hideLoader
                            );
                            handleError(
                                error,
                                "Removed from Watchlater",
                                "Failed to remove from Watchlater"
                            );
                        } else {
                            navigate("/sign-in", {
                                state: {
                                    from: location.pathname,
                                },
                            });
                        }
                    }}>
                    <i className="fas fa-bookmark me-2" />
                </button>
            )}
        </div>
    );
};
