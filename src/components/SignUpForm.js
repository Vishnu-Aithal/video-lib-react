import { signUpHandler } from "utility-functions/authHandler";
import { useNavigate } from "react-router-dom";
import { useAuth } from "contexts/auth-context";
import { useLoader } from "contexts/loader-context";
export const SignUpForm = () => {
    const { authDispatch } = useAuth();
    const navigate = useNavigate();
    const { showLoader, hideLoader } = useLoader();
    return (
        <form
            onSubmit={async (e) => {
                e.preventDefault();
                const response = await signUpHandler(
                    e.target.email.value,
                    e.target.password.value,
                    e.target.firstName.value,
                    e.target.lastName.value,
                    showLoader,
                    hideLoader
                );
                if (response) {
                    authDispatch({
                        type: "LOGIN",
                        payload: response,
                    });
                    navigate("/");
                }
            }}
            className="p-4 w-fit mx-auto br-2 mt-6">
            <h2 className="heading-md text-center mb-4">Sign Up</h2>

            <div className="input">
                <input
                    type="text"
                    className="input__field"
                    name="firstName"
                    placeholder="First name"
                    required
                />
                <label className="input__float-label" htmlFor="name">
                    First Name
                </label>
                <span className="input__required-text"></span>
            </div>
            <div className="input">
                <input
                    type="text"
                    className="input__field"
                    name="lastName"
                    placeholder="Last name"
                    required
                />
                <label className="input__float-label" htmlFor="name">
                    Last Name
                </label>
                <span className="input__required-text"></span>
            </div>
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
                    placeholder="Enter New Password"
                    minLength="8"
                    required
                />
                <label className="input__float-label" htmlFor="password">
                    New Password
                </label>
                <span className="input__required-text"></span>
            </div>

            <div className="input">
                <input
                    className="input__field"
                    type="password"
                    name="password"
                    id="password2"
                    placeholder="Confirm Password"
                    minLength="8"
                    required
                />
                <label className="input__float-label" htmlFor="password">
                    Confirm Password
                </label>
                <span className="input__required-text"></span>
            </div>
            <div className="input mx-auto">
                <input type="checkbox" name="tandc" id="" required />
                <label className="text-sm" htmlFor="">
                    I accept all terms and conditions
                </label>
            </div>
            <input
                className="btn btn--primary br-1 mt-2 w-100p"
                type="submit"
                value="Sign Up"></input>
        </form>
    );
};
