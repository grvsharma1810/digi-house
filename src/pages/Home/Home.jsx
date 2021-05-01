import "./Home.css";
import React from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@material-ui/core";
import { Box } from "@material-ui/core";

function Home() {
    const navigate = useNavigate();

    return (
        <Box
            display="flex"
            m="2rem"
            flexDirection="row"
            justifyContent="center"
        >
            <Button
                onClick={() => navigate("/create-room")}
                variant="contained"
                color="secondary"
                size="large"
            >
                Create Chat Room
            </Button>
        </Box>
    );
}

export default Home;
