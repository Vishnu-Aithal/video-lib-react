import { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { VideoDetails } from "types/VideoDetails";
import classes from "./SingleVideoPage.module.css";
import axios from "axios";
import ReactPlayer from "react-player";
import {
    addToLikes,
    addToWatchlater,
    inLikes,
    inWatchlater,
    removeFromLikes,
    removeFromWatchlater,
} from "utility-functions/userHandler";
import { useUserData } from "contexts/user-context";
import { useAuth } from "contexts/auth-context";
import { useLoader } from "contexts/loader-context";
import { useToast } from "contexts/toast-context";
import { openPlaylistsModal } from "utility-functions/playlistHandler";
import { usePlaylists } from "contexts/playlist-context";

export const SingleVideoPage: React.FC = () => {
    const { videoId } = useParams();
    const [videoData, setVideoData] = useState<VideoDetails | null>(null);
    const [error, setError] = useState(false);
    const {
        userState: { likes, watchlater },
        userDispatch,
    } = useUserData();
    const navigate = useNavigate();
    const {
        authState: { isLoggedIn, token },
    } = useAuth();
    const { showLoader, hideLoader } = useLoader();
    const { showToast } = useToast();
    const location = useLocation();
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

    useEffect(() => {
        (async () => {
            try {
                const videoIdURI = encodeURI(videoId!);
                showLoader("Fetching Video");
                const response = await axios.get(`/api/video/${videoIdURI}`);
                setVideoData(response.data.video);
            } catch (error) {
                setError(true);
            } finally {
                hideLoader();
            }
        })();
    }, [videoId, showLoader, hideLoader]);
    return videoData ? (
        <div className={classes["video-container"]}>
            <ReactPlayer
                url={videoData.url}
                style={{ maxWidth: "95%", margin: "0 auto" }}
                controls
            />
            <div
                className={`${classes["video-buttons"]} br-2 shadow-md-hover px-4`}>
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
        </div>
    ) : (
        <h3 className="text-center mt-4">
            {error
                ? "Could not Load Video, Incorrect Url or Network Error"
                : ""}
        </h3>
    );
};
