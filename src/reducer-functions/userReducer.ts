export const initialState = {
    likes: [],
    watchlater: [],
    history: [],
};

export const userReducerFunction = (state, { type, payload }) => {
    switch (type) {
        case "LOAD_USER_DATA":
            return {
                ...state,
                likes: payload.likes,
                watchlater: payload.watchlater,
                history: payload.history,
            };
        case "SET_LIKES":
            return {
                ...state,
                likes: payload,
            };
        case "SET_WATCHLATER":
            return {
                ...state,
                watchlater: payload,
            };
        case "SET_HISTORY":
            return {
                ...state,
                history: payload,
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
