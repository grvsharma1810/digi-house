import React from "react";
import { Box } from "@material-ui/core";

function LoginError() {
    return (
        <Box textAlign="center" p={4} fontSize={26}>
            You are not logged in. Please login first.
        </Box>
    );
}

export default LoginError;
