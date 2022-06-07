export const initialState = {
    isLoggedIn: false,
    userId: undefined,
    token: undefined,
};
export const authReducerFunction = (state, { type, payload }) => {
    switch (type) {
        case "LOGIN":
            return {
                ...state,
                isLoggedIn: true,
                userId: payload.userId,
                token: payload.token,
            };
        case "LOGOUT":
            return {
                ...initialState,
            };
        default:
            return state;
    }
};
