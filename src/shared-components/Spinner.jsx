import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { CircularProgress, Container } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
    spinner: {
        textAlign: "center",
        padding: theme.spacing(4),
    },
}));

function Spinner() {
    const classes = useStyles();
    return (
        <Container className={classes.spinner}>
            <CircularProgress color="secondary" size={60} thickness={4} />
        </Container>
    );
}

export default Spinner;
