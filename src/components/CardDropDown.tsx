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
    const { showLoader, hideLoader } = useLoader();
    const { playlistsDispatch } = usePlaylists();
    const navigate = useNavigate();
    const location = useLocation();
    const ref = useRef<HTMLUListElement>(null);
    useEffect(() => ref.current!.focus(), []);

    return (
        <ul
            tabIndex={-1}
            ref={ref}
            onBlur={() => setDropDown(false)}
            className={`card__drop-down list-group shadow-sm br-1 ${
                dropDown ? "show" : ""
            }`}>
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
                    onClick={() => {
                        isLoggedIn
                            ? addToWatchlater(
                                  token!,
                                  video,
                                  userDispatch,
                                  showLoader,
                                  hideLoader
                              )
                            : navigate("/sign-in", {
                                  state: {
                                      from: location.pathname,
                                  },
                              });
                        setDropDown(false);
                    }}>
                    Add to Watch Later
                </li>
            ) : (
                <li
                    className="list__item bg-white"
                    onClick={() => {
                        isLoggedIn
                            ? removeFromWatchlater(
                                  token!,
                                  video,
                                  userDispatch,
                                  showLoader,
                                  hideLoader
                              )
                            : navigate("/sign-in", {
                                  state: {
                                      from: location.pathname,
                                  },
                              });
                        setDropDown(false);
                    }}>
                    Remove From Watch Later
                </li>
            )}
        </ul>
    );
};
