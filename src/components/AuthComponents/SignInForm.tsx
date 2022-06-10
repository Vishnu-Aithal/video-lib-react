import { signInHandler } from "utility-functions/authHandler";
import { useNavigate, useLocation, Link } from "react-router-dom";
import { useAuth } from "contexts/auth-context";
import { useLoader } from "contexts/loader-context";
import classes from "./Auth.module.css";
import { useToast } from "contexts/toast-context";
import { useState } from "react";
export const SignInForm: React.FC = () => {
    const navigate = useNavigate();
    const locationState = useLocation().state as { from: string };
    const { authDispatch } = useAuth();
    const { showLoader, hideLoader } = useLoader();
    const { showToast } = useToast();
    const [rememberMe, setRememberMe] = useState(false);
    return (
        <>
            <form
                onSubmit={async (e) => {
                    e.preventDefault();
                    const target = e.target as HTMLFormElement & {
                        email: HTMLInputElement;
                        password: HTMLInputElement;
                    };
                    const error = await signInHandler(
                        target.email.value,
                        target.password.value,
                        authDispatch,
                        rememberMe,
                        showLoader,
                        hideLoader
                    );
                    if (error) {
                        showToast({
                            title: "Login Failed",
                            description: "Please try Again after sometime",
                            type: "error",
                        });
                    } else {
                        showToast({
                            title: "Login Succes",
                            type: "success",
                        });
                        if (locationState) {
                            debugger;
                            navigate(locationState.from);
                        } else {
                            navigate("/");
                        }
                    }
                }}
                className="p-4 w-fit mx-auto br-2 mt-6">
                <h2 className="heading-md text-center mb-4">Sign In</h2>
                <div className="input">
                    <input
                        className="input__field"
                        type="email"
                        name="email"
                        id="email"
                        placeholder="Enter Email"
                        required
                    />
                    <label className="input__float-label" htmlFor="email">
                        Email
                    </label>
                    <span className="input__required-text"></span>
                </div>
                <div className="input">
                    <input
                        className="input__field"
                        type="password"
                        name="password"
                        id="password"
                        placeholder="Enter Password"
                        minLength={8}
                        required
                    />
                    <label className="input__float-label" htmlFor="password">
                        Password
                    </label>
                    <span className="input__required-text"></span>
                </div>
                <div className="input ms-1">
                    <input
                        onChange={(e) => setRememberMe(e.target.checked)}
                        checked={rememberMe}
                        type="checkbox"
                        className=""
                        name="tandc"
                        id="remember-me"
                    />
                    <label className="text-sm" htmlFor="remember-me">
                        Remember Me
                    </label>
                </div>
                <input
                    className="btn btn--primary br-1 mt-2 w-100p"
                    type="submit"
                    value="Sign In"></input>
                <p className={`${classes["helper-text"]} mt-3`}>
                    Not a member? <Link to={"/sign-up"}>Sign Up</Link>
                </p>
                <button
                    className="btn btn--primary br-1 mt-2 "
                    onClick={async () => {
                        const error = await signInHandler(
                            "adarshbalika@gmail.com",
                            "adarshBalika123",
                            authDispatch,
                            rememberMe,
                            showLoader,
                            hideLoader
                        );
                        if (error) {
                            showToast({
                                title: "Login Failed",
                                description: "Please try Again after sometime",
                                type: "error",
                            });
                        } else {
                            showToast({
                                title: "Login Succes",
                                type: "success",
                            });
                            if (locationState) {
                                navigate(locationState.from);
                            } else {
                                navigate("/");
                            }
                        }
                    }}>
                    Sign In Demo
                </button>
            </form>
        </>
    );
};
