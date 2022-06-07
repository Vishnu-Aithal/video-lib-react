import axios from "axios";
import { HideLoader, ShowLoader } from "contexts/loader-context";

export const signInHandler = async (
    email: string,
    password: string,
    showLoader: ShowLoader,
    hideLoader: HideLoader
) => {
    showLoader("Signing In");
    try {
        const {
            status,
            data: { encodedToken, foundUser },
        } = await axios.post("/api/auth/login", {
            email: email,
            password: password,
        });
        if (status === 200) {
            const token = encodedToken;
            const userId = foundUser._id;
            localStorage.setItem("token", token);
            localStorage.setItem("userId", userId);
            return { token, userId };
        }
    } catch (error) {
        console.log(error);
    } finally {
        hideLoader();
    }
};
export const signUpHandler = async (
    email: string,
    password: string,
    firstName: string,
    lastName: string,
    showLoader: ShowLoader,
    hideLoader: HideLoader
) => {
    showLoader("Signing Up");
    try {
        const response = await axios.post("/api/auth/signup", {
            email,
            password,
            firstName,
            lastName,
        });
        if (response.status === 201) {
            const token = response.data.encodedToken;
            const userId = response.data.createdUser._id;
            localStorage.setItem("token", token);
            localStorage.setItem("userId", userId);
            return { token, userId };
        }
    } catch (error) {
        console.log(error);
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
