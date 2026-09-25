import { Navigate } from "react-router-dom";
import { isLoggedIn } from "../auth/token";

type ProtectedRouteProps = {
    children: React.ReactNode;
};

function ProtectedRoute({ children }: ProtectedRouteProps) {

    if (!isLoggedIn()) {
        return <Navigate to="/login" replace />;
    }

    return children;
}

export default ProtectedRoute;