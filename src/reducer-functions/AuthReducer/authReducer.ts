import { AuthActionTypes } from "./authActionTypes";

interface LoggedIn {
    isLoggedIn: true;
    userId: string;
    token: string;
}
interface LoggedOut {
    isLoggedIn: false;
    userId: null;
    token: null;
}

export type AuthState = LoggedIn | LoggedOut;

export const initialState: AuthState = {
    isLoggedIn: false,
    userId: null,
    token: null,
};
export const authReducerFunction = (
    state: AuthState,
    action: AuthActionTypes
): AuthState => {
    const type = action.type;
    switch (type) {
        case "LOGIN":
            return {
                ...state,
                isLoggedIn: true,
                userId: action.payload.userId,
                token: action.payload.token,
            };
        case "LOGOUT":
            return {
                ...initialState,
            };
        default:
            return state;
    }
};
