import {
    useContext,
    createContext,
    useReducer,
    PropsWithChildren,
} from "react";
import { useEffect } from "react";
import { AuthActionTypes } from "reducer-functions/AuthReducer/authActionTypes";
import {
    authReducerFunction,
    AuthState,
    initialState,
} from "reducer-functions/AuthReducer/authReducer";

interface AuthContextValue {
    authState: AuthState;
    authDispatch: React.Dispatch<AuthActionTypes>;
}

const AuthContext = createContext<AuthContextValue>({
    authState: initialState,
    authDispatch: () => {},
});

export const AuthProvider: React.FC<PropsWithChildren> = ({ children }) => {
    const [authState, authDispatch] = useReducer(
        authReducerFunction,
        initialState
    );
    useEffect(() => {
        const token = localStorage.getItem("token");
        const userId = localStorage.getItem("userId");
        if (token && userId) {
            authDispatch({ type: "LOGIN", payload: { token, userId } });
        }
    }, []);
    return (
        <AuthContext.Provider value={{ authState, authDispatch }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
