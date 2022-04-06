import axios from "axios";

export const loadUserData = async (
    token,
    userDispatch,
    showLoader,
    hideLoader
) => {
    try {
        showLoader("Getting Liked Videos");
        const {
            data: { likes },
            likesStatus,
        } = await axios.get("/api/user/likes", {
            headers: {
                authorization: token,
            },
        });
        const {
            data: { watchlater },
            watchlaterStatus,
        } = await axios.get("/api/user/watchlater", {
            headers: {
                authorization: token,
            },
        });
        const {
            data: { history },
            historyStatus,
        } = await axios.get("/api/user/history", {
            headers: {
                authorization: token,
            },
        });
        userDispatch({
            type: "LOAD_USER_DATA",
            payload: { likes, watchlater, history },
        });
    } catch (error) {
        console.log(error);
    } finally {
        hideLoader();
    }
};

export const resetUserData = (userDispatch) =>
    userDispatch({ type: "RESET_USER_DATA" });

export const inLikes = (likes, video) =>
    likes.findIndex((likedVideo) => likedVideo._id === video._id) !== -1;

export const inWatchlater = (watchlater, video) =>
    watchlater.findIndex(
        (watchlaterVideo) => watchlaterVideo._id === video._id
    ) !== -1;

export const inHistory = (history, video) =>
    history.findIndex((historyVideo) => historyVideo._id === video._id) !== -1;

export const addToLikes = async (
    token,
    video,
    userDispatch,
    showLoader,
    hideLoader
) => {
    try {
        showLoader("Adding To Likes");
        const {
            data: { likes },
            likesStatus,
        } = await axios.post(
            "/api/user/likes",
            { video },
            {
                headers: {
                    authorization: token,
                },
            }
        );
        userDispatch({ type: "SET_LIKES", payload: likes });
    } catch (error) {
        console.log(error);
    } finally {
        hideLoader();
    }
};

export const removeFromLikes = async (
    token,
    video,
    userDispatch,
    showLoader,
    hideLoader
) => {
    try {
        showLoader("Removing From Likes");
        const {
            data: { likes },
            likesStatus,
        } = await axios.delete(`/api/user/likes/${video._id}`, {
            headers: {
                authorization: token,
            },
        });
        userDispatch({ type: "SET_LIKES", payload: likes });
    } catch (error) {
        console.log(error);
    } finally {
        hideLoader();
    }
};

export const addToWatchlater = async (
    token,
    video,
    userDispatch,
    showLoader,
    hideLoader
) => {
    try {
        showLoader("Adding To Watchlater");
        const {
            data: { watchlater },
            watchlaterStatus,
        } = await axios.post(
            "/api/user/watchlater",
            { video },
            {
                headers: {
                    authorization: token,
                },
            }
        );
        userDispatch({ type: "SET_WATCHLATER", payload: watchlater });
    } catch (error) {
        console.log(error);
    } finally {
        hideLoader();
    }
};

export const removeFromWatchlater = async (
    token,
    video,
    userDispatch,
    showLoader,
    hideLoader
) => {
    try {
        showLoader("Removing From Watchlater");
        const {
            data: { watchlater },
            watchlaterStatus,
        } = await axios.delete(`/api/user/watchlater/${video._id}`, {
            headers: {
                authorization: token,
            },
        });
        userDispatch({ type: "SET_WATCHLATER", payload: watchlater });
    } catch (error) {
        console.log(error);
    } finally {
        hideLoader();
    }
};

export const addToHistory = async (token, video, userDispatch) => {
    try {
        const {
            data: { history },
            historyStatus,
        } = await axios.post(
            "/api/user/history",
            { video },
            {
                headers: {
                    authorization: token,
                },
            }
        );
        userDispatch({ type: "SET_HISTORY", payload: history });
    } catch (error) {
        console.log(error);
    }
};

export const removeFromHistory = async (
    token,
    video,
    userDispatch,
    showLoader,
    hideLoader
) => {
    try {
        showLoader("Removing From History");
        const {
            data: { history },
            historyStatus,
        } = await axios.delete(`/api/user/history/${video._id}`, {
            headers: {
                authorization: token,
            },
        });
        userDispatch({ type: "SET_HISTORY", payload: history });
    } catch (error) {
        console.log(error);
    } finally {
        hideLoader();
    }
};

export const clearHistory = async (
    token,
    userDispatch,
    showLoader,
    hideLoader
) => {
    try {
        showLoader("Clearing History");
        const {
            data: { history },
            historyStatus,
        } = await axios.delete("/api/user/history/all", {
            headers: {
                authorization: token,
            },
        });
        userDispatch({ type: "SET_HISTORY", payload: history });
    } catch (error) {
        console.log(error);
    } finally {
        hideLoader();
    }
};
