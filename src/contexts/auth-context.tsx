import { useContext, createContext, useReducer } from "react";
import { useEffect } from "react";
import {
    authReducerFunction,
    initialState,
} from "reducer-functions/authReducer";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
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
