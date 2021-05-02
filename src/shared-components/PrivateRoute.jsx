import { Route, Navigate } from "react-router-dom";
import { useUser } from "../Providers/UserProvider";

function PrivateRoute({ path, ...props }) {
    const { loggedInUser } = useUser();
    return loggedInUser ? (
        <Route {...props} path={path} />
    ) : (
        <Navigate state={{ from: path }} replace to="/login-error" />
    );
}

export default PrivateRoute;
