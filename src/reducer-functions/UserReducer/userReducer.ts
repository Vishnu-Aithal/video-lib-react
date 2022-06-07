import { VideoDetails } from "types/VideoDetails";
import { UserActions } from "./userActionTypes";

export interface UserState {
    likes: VideoDetails[];
    watchlater: VideoDetails[];
    history: VideoDetails[];
}
export const initialState: UserState = {
    likes: [],
    watchlater: [],
    history: [],
};

export const userReducerFunction = (
    state: UserState,
    action: UserActions
): UserState => {
    const type = action.type;
    switch (type) {
        case "LOAD_USER_DATA":
            return {
                ...state,
                likes: action.payload.likes,
                watchlater: action.payload.watchlater,
                history: action.payload.history,
            };
        case "SET_LIKES":
            return {
                ...state,
                likes: action.payload,
            };
        case "SET_WATCHLATER":
            return {
                ...state,
                watchlater: action.payload,
            };
        case "SET_HISTORY":
            return {
                ...state,
                history: action.payload,
            };
        case "RESET_USER_DATA":
            return {
                likes: [],
                watchlater: [],
                history: [],
            };

        default:
            return state;
    }
};
