import { Outlet, Navigate, useLocation } from "react-router-dom";

export const ProtectedRoute: React.FC<{ isLoggedIn: boolean }> = ({
    isLoggedIn,
}) => {
    const location = useLocation();
    return isLoggedIn ? (
        <Outlet />
    ) : (
        <Navigate to="/sign-in" state={{ from: location.pathname }} replace />
    );
};

export const ProtectedAuth: React.FC<{ isLoggedIn: boolean }> = ({
    isLoggedIn,
}) => {
    return !isLoggedIn ? <Outlet /> : <Navigate to="/" replace />;
};
