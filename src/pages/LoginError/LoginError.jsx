import React from "react";
import { Box } from "@material-ui/core";
import { useUser } from "../../Providers/UserProvider";
import { useNavigate } from "react-router-dom";

function LoginError() {
    const navigate = useNavigate();
    const { loggedInUser } = useUser();

    React.useEffect(() => {
        if (loggedInUser) {
            navigate("/");
        }
    }, [loggedInUser]);

    return (
        <Box textAlign="center" p={4} fontSize={26}>
            You are not logged in. Please login first.
        </Box>
    );
}

export default LoginError;
