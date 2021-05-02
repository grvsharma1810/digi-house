import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Box, CircularProgress, Container } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
    spinner: {
        textAlign: "center",
        padding: theme.spacing(4),
    },
}));

function Spinner({ description = null }) {
    const classes = useStyles();
    return (
        <Container className={classes.spinner}>
            <CircularProgress color="secondary" size={60} thickness={4} />
            {description && <Box mt={1}>{description}</Box>}
        </Container>
    );
}

export default Spinner;
