import { useContext, createContext, useReducer, useEffect } from "react";
import { useAuth } from "contexts/auth-context";
import { useLoader } from "contexts/loader-context";

import {
    initialState,
    userReducerFunction,
} from "reducer-functions/userReducer";

import { loadUserData, resetUserData } from "utility-functions/userHandler";

const UserContext = createContext();

export const UserProvider = ({ children }) => {
    const [userState, userDispatch] = useReducer(
        userReducerFunction,
        initialState
    );

    const {
        authState: { isLoggedIn, token },
    } = useAuth();
    const { showLoader, hideLoader } = useLoader();

    useEffect(() => {
        (async () => {
            isLoggedIn
                ? loadUserData(token, userDispatch, showLoader, hideLoader)
                : resetUserData(userDispatch);
        })();
    }, [isLoggedIn]);

    return (
        <UserContext.Provider value={{ userState, userDispatch }}>
            {children}
        </UserContext.Provider>
    );
};

export const useUserData = () => useContext(UserContext);
