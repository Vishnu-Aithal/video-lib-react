import axios from "axios";
import { HideLoader, ShowLoader } from "contexts/loader-context";
import React, { SetStateAction } from "react";
import { UserActions } from "reducer-functions/UserReducer/userActionTypes";
import { VideoDetails } from "types/VideoDetails";

export const loadUserData = async (
    token: string,
    userDispatch: React.Dispatch<UserActions>,
    showLoader: ShowLoader,
    hideLoader: HideLoader
) => {
    try {
        showLoader("Getting Liked Videos");
        const {
            data: { likes },
        } = await axios.get(
            `http://${process.env.REACT_APP_BACKEND_URL}/api/user/likes`,
            {
                headers: {
                    authorization: token,
                },
            }
        );
        const {
            data: { watchlater },
        } = await axios.get(
            `http://${process.env.REACT_APP_BACKEND_URL}/api/user/watchlater`,
            {
                headers: {
                    authorization: token,
                },
            }
        );
        const {
            data: { history },
        } = await axios.get(
            `http://${process.env.REACT_APP_BACKEND_URL}/api/user/history`,
            {
                headers: {
                    authorization: token,
                },
            }
        );
        userDispatch({
            type: "LOAD_USER_DATA",
            payload: { likes, watchlater, history },
        });
    } catch (error) {
        return error;
    } finally {
        hideLoader();
    }
};

export const resetUserData = (userDispatch: React.Dispatch<UserActions>) =>
    userDispatch({ type: "RESET_USER_DATA" });

export const inLikes = (likes: VideoDetails[], video: VideoDetails) =>
    likes.findIndex((likedVideo) => likedVideo._id === video._id) !== -1;

export const inWatchlater = (watchlater: VideoDetails[], video: VideoDetails) =>
    watchlater.findIndex(
        (watchlaterVideo) => watchlaterVideo._id === video._id
    ) !== -1;

export const inHistory = (history: VideoDetails[], video: VideoDetails) =>
    history.findIndex((historyVideo) => historyVideo._id === video._id) !== -1;

export const addToLikes = async (
    token: string,
    video: VideoDetails,
    userDispatch: React.Dispatch<UserActions>,
    showLoader: ShowLoader,
    hideLoader: HideLoader
) => {
    try {
        showLoader("Adding To Likes");
        const {
            data: { likes },
        } = await axios.post(
            `http://${process.env.REACT_APP_BACKEND_URL}/api/user/likes`,
            { video },
            {
                headers: {
                    authorization: token,
                },
            }
        );
        userDispatch({ type: "SET_LIKES", payload: likes });
    } catch (error) {
        return error;
    } finally {
        hideLoader();
    }
};

export const removeFromLikes = async (
    token: string,
    video: VideoDetails,
    userDispatch: React.Dispatch<UserActions>,
    showLoader: ShowLoader,
    hideLoader: HideLoader
) => {
    try {
        showLoader("Removing From Likes");
        const {
            data: { likes },
        } = await axios.delete(
            `http://${process.env.REACT_APP_BACKEND_URL}/api/user/likes/${video._id}`,
            {
                headers: {
                    authorization: token,
                },
            }
        );
        userDispatch({ type: "SET_LIKES", payload: likes });
    } catch (error) {
        return error;
    } finally {
        hideLoader();
    }
};

export const addToWatchlater = async (
    token: string,
    video: VideoDetails,
    userDispatch: React.Dispatch<UserActions>,
    showLoader: ShowLoader,
    hideLoader: HideLoader
) => {
    try {
        showLoader("Adding To Watchlater");
        const {
            data: { watchlater },
        } = await axios.post(
            `http://${process.env.REACT_APP_BACKEND_URL}/api/user/watchlater`,
            { video },
            {
                headers: {
                    authorization: token,
                },
            }
        );
        userDispatch({ type: "SET_WATCHLATER", payload: watchlater });
    } catch (error) {
        return error;
    } finally {
        hideLoader();
    }
};

export const removeFromWatchlater = async (
    token: string,
    video: VideoDetails,
    userDispatch: React.Dispatch<UserActions>,
    showLoader: ShowLoader,
    hideLoader: HideLoader
) => {
    try {
        showLoader("Removing From Watchlater");
        const {
            data: { watchlater },
        } = await axios.delete(
            `http://${process.env.REACT_APP_BACKEND_URL}/api/user/watchlater/${video._id}`,
            {
                headers: {
                    authorization: token,
                },
            }
        );
        userDispatch({ type: "SET_WATCHLATER", payload: watchlater });
    } catch (error) {
        return error;
    } finally {
        hideLoader();
    }
};

export const addToHistory = async (
    token: string,
    video: VideoDetails,
    userDispatch: React.Dispatch<UserActions>
) => {
    try {
        const {
            data: { history },
        } = await axios.post(
            `http://${process.env.REACT_APP_BACKEND_URL}/api/user/history`,
            { video },
            {
                headers: {
                    authorization: token,
                },
            }
        );
        userDispatch({ type: "SET_HISTORY", payload: history });
    } catch (error) {
        return error;
    }
};

export const removeFromHistory = async (
    token: string,
    video: VideoDetails,
    userDispatch: React.Dispatch<UserActions>,
    showLoader: ShowLoader,
    hideLoader: HideLoader
) => {
    try {
        showLoader("Removing From History");
        const {
            data: { history },
        } = await axios.delete(
            `http://${process.env.REACT_APP_BACKEND_URL}/api/user/history/${video._id}`,
            {
                headers: {
                    authorization: token,
                },
            }
        );
        userDispatch({ type: "SET_HISTORY", payload: history });
    } catch (error) {
        return error;
    } finally {
        hideLoader();
    }
};

export const clearHistory = async (
    token: string,
    userDispatch: React.Dispatch<UserActions>,
    showLoader: ShowLoader,
    hideLoader: HideLoader
) => {
    try {
        showLoader("Clearing History");
        const {
            data: { history },
        } = await axios.delete(
            `http://${process.env.REACT_APP_BACKEND_URL}/api/user/history/all`,
            {
                headers: {
                    authorization: token,
                },
            }
        );
        userDispatch({ type: "SET_HISTORY", payload: history });
    } catch (error) {
        return error;
    } finally {
        hideLoader();
    }
};

export const addCommenttoVideo = async (
    token: string,
    comment: string,
    videoId: string,
    setVideo: React.Dispatch<SetStateAction<VideoDetails | null>>,
    showLoader: ShowLoader,
    hideLoader: HideLoader
) => {
    try {
        showLoader("Adding Comment");
        const {
            data: { video },
        } = await axios.post(
            `http://${process.env.REACT_APP_BACKEND_URL}/api/video/comment/${videoId}`,
            { comment },
            {
                headers: {
                    authorization: token,
                },
            }
        );
        setVideo(video);
    } catch (error) {
        return error;
    } finally {
        hideLoader();
    }
};
