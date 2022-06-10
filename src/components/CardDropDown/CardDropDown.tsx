import { openPlaylistsModal } from "utility-functions/playlistHandler";
import {
    addToWatchlater,
    inWatchlater,
    removeFromWatchlater,
} from "utility-functions/userHandler";
import React, { useRef, useEffect } from "react";
import { useAuth } from "contexts/auth-context";
import { useUserData } from "contexts/user-context";
import { useLoader } from "contexts/loader-context";
import { usePlaylists } from "contexts/playlist-context";
import { useNavigate, useLocation } from "react-router-dom";
import { VideoDetails } from "types/VideoDetails";
import classes from "./CardDropDown.module.css";
import { useToast } from "contexts/toast-context";

interface Props {
    dropDown: boolean;
    setDropDown: React.Dispatch<React.SetStateAction<boolean>>;
    video: VideoDetails;
}
export const CardDropDown: React.FC<Props> = ({
    dropDown,
    setDropDown,
    video,
}) => {
    const {
        userState: { watchlater },
        userDispatch,
    } = useUserData();
    const {
        authState: { token, isLoggedIn },
    } = useAuth();
    const { showToast } = useToast();
    const { showLoader, hideLoader } = useLoader();
    const { playlistsDispatch } = usePlaylists();
    const navigate = useNavigate();
    const location = useLocation();
    const ref = useRef<HTMLUListElement>(null);
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
    useEffect(() => ref.current!.focus(), []);

    return (
        <ul
            tabIndex={-1}
            ref={ref}
            onBlur={() => setDropDown(false)}
            className={`${
                classes["card__drop-down"]
            } list-group shadow-sm br-1 ${dropDown ? classes["show"] : ""}`}>
            <li
                className="list__item bg-white"
                onClick={() => {
                    isLoggedIn
                        ? openPlaylistsModal(video, playlistsDispatch)
                        : navigate("/sign-in", {
                              state: {
                                  from: location.pathname,
                              },
                          });
                    setDropDown(false);
                }}>
                Add to Playlist
            </li>
            {!inWatchlater(watchlater, video) ? (
                <li
                    className="list__item bg-white"
                    onClick={async () => {
                        if (isLoggedIn) {
                            const error = await addToWatchlater(
                                token!,
                                video,
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
                        setDropDown(false);
                    }}>
                    Add to Watch Later
                </li>
            ) : (
                <li
                    className="list__item bg-white"
                    onClick={async () => {
                        if (isLoggedIn) {
                            const error = await removeFromWatchlater(
                                token!,
                                video,
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
                        setDropDown(false);
                    }}>
                    Remove From Watch Later
                </li>
            )}
        </ul>
    );
};
