import {
    useContext,
    createContext,
    useReducer,
    useEffect,
    PropsWithChildren,
} from "react";
import { useAuth } from "contexts/auth-context";
import { useLoader } from "contexts/loader-context";

import {
    initialState,
    userReducerFunction,
    UserState,
} from "reducer-functions/UserReducer/userReducer";

import { loadUserData, resetUserData } from "utility-functions/userHandler";
import { UserActions } from "reducer-functions/UserReducer/userActionTypes";

interface UserContextValue {
    userState: UserState;
    userDispatch: React.Dispatch<UserActions>;
}

const UserContext = createContext<UserContextValue>({
    userState: initialState,
    userDispatch: () => {},
});

export const UserProvider: React.FC<PropsWithChildren> = ({ children }) => {
    const [userState, userDispatch] = useReducer(
        userReducerFunction,
        initialState
    );

    const { authState } = useAuth();
    const { showLoader, hideLoader } = useLoader();

    useEffect(() => {
        (async () => {
            authState.isLoggedIn
                ? loadUserData(
                      authState.token,
                      userDispatch,
                      showLoader,
                      hideLoader
                  )
                : resetUserData(userDispatch);
        })();
    }, [showLoader, hideLoader, authState]);

    return (
        <UserContext.Provider value={{ userState, userDispatch }}>
            {children}
        </UserContext.Provider>
    );
};

export const useUserData = () => useContext(UserContext);
