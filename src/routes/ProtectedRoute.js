import { SignIn } from "routes";
import { Outlet, Navigate } from "react-router-dom";

export const ProtectedRoute = ({ isLoggedIn }) => {
    return isLoggedIn ? <Outlet /> : <SignIn />;
};

export const ProtectedAuth = ({ isLoggedIn }) => {
    return !isLoggedIn ? <Outlet /> : <Navigate to="/" replace />;
};
