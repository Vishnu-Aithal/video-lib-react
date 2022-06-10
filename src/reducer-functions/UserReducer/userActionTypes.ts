import { VideoDetails } from "types/VideoDetails";

interface LoadUserData {
    type: "LOAD_USER_DATA";
    payload: {
        likes: VideoDetails[];
        watchlater: VideoDetails[];
        history: VideoDetails[];
    };
}

interface SetLikes {
    type: "SET_LIKES";
    payload: VideoDetails[];
}
interface SetWatchlater {
    type: "SET_WATCHLATER";
    payload: VideoDetails[];
}
interface SetHistory {
    type: "SET_HISTORY";
    payload: VideoDetails[];
}

interface ResetUserData {
    type: "RESET_USER_DATA";
}

export type UserActions =
    | LoadUserData
    | SetHistory
    | SetLikes
    | SetWatchlater
    | ResetUserData;
