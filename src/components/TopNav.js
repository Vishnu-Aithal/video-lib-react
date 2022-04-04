import { useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "contexts/auth-context";
import { useLoader } from "contexts/loader-context";
import { signOutHandler } from "utility-functions/authHandler";

export const TopNav = () => {
    const [collapsed, setCollapsed] = useState(true);
    const {
        authState: { isLoggedIn },
        authDispatch,
    } = useAuth();
    const { showLoader, hideLoader } = useLoader();
    const navigate = useNavigate();
    return (
        <nav className="nav-bar bg-secondary shadow-sm">
            <div className="nav-bar__header heading-md text-bold clr-white me-2">
                <Link className="nav-bar__link" to="/">
                    Video Library
                </Link>
            </div>
            <button
                className={`nav-bar__toggle btn btn--icon-lg clr-white br-2 ms-auto ${
                    !collapsed ? "active" : ""
                }`}
                onClick={() => setCollapsed((collapsed) => !collapsed)}>
                <i className="nav-bar__toggle-icon fas fa-bars"></i>
            </button>
            <ul
                className={`ms-auto nav-bar__list-group clr-white ${
                    !collapsed ? "show" : ""
                }`}
                id="nav-links">
                <li className="nav-bar__list-item mx-1">
                    {isLoggedIn ? (
                        <div
                            className="nav-bar__link"
                            onClick={() => {
                                signOutHandler(showLoader, hideLoader);
                                authDispatch({ type: "LOGOUT" });
                                setTimeout(() => navigate("/"), 600);
                            }}>
                            <i className="fas fa-user me-2"></i>Sign Out
                        </div>
                    ) : (
                        <NavLink
                            to="/sign-in"
                            className={({ isActive }) =>
                                isActive
                                    ? "nav-bar__link nav-bar__link--active"
                                    : "nav-bar__link"
                            }>
                            <i className="fas fa-user me-2"></i>
                            Sign In
                        </NavLink>
                    )}
                </li>
            </ul>
        </nav>
    );
};
