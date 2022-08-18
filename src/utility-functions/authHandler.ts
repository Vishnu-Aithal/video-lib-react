import axios from "axios";
import { HideLoader, ShowLoader } from "contexts/loader-context";
import React from "react";
import { AuthActionTypes } from "reducer-functions/AuthReducer/authActionTypes";

export const signInHandler = async (
    email: string,
    password: string,
    authDispatch: React.Dispatch<AuthActionTypes>,
    rememberMe: boolean,
    showLoader: ShowLoader,
    hideLoader: HideLoader
) => {
    showLoader("Signing In");
    try {
        const {
            status,
            data: { encodedToken, foundUser },
        } = await axios.post(
            `http://${process.env.REACT_APP_BACKEND_URL}/api/auth/login`,
            {
                email: email,
                password: password,
            }
        );

        if (status === 200) {
            const token = encodedToken;
            const userId = foundUser._id;
            if (rememberMe) {
                localStorage.setItem("token", token);
                localStorage.setItem("userId", userId);
            }
            authDispatch({
                type: "LOGIN",
                payload: { token: encodedToken, userId: userId },
            });
        }
    } catch (error) {
        console.log(error);
        return error;
    } finally {
        hideLoader();
    }
};
export const signUpHandler = async (
    email: string,
    password: string,
    firstName: string,
    lastName: string,
    authDispatch: React.Dispatch<AuthActionTypes>,
    showLoader: ShowLoader,
    hideLoader: HideLoader
) => {
    showLoader("Signing Up");
    try {
        const response = await axios.post(
            `http://${process.env.REACT_APP_BACKEND_URL}/api/auth/signup`,
            {
                email,
                password,
                firstName,
                lastName,
            }
        );
        if (response.status === 201) {
            const token = response.data.encodedToken;
            const userId = response.data.createdUser._id;
            authDispatch({
                type: "LOGIN",
                payload: { token, userId },
            });
        }
    } catch (error) {
        return error;
    } finally {
        hideLoader();
    }
};
export const signOutHandler = (
    showLoader: ShowLoader,
    hideLoader: HideLoader
) => {
    showLoader("Signing Out");
    localStorage.removeItem("token");
    localStorage.removeItem("userId");
    setTimeout(hideLoader, 500);
};
