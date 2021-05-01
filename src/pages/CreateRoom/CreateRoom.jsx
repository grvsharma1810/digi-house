import React from "react";
import { Button, Container, TextField, Box } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
    textField: {
        margin: theme.spacing(1),
    },
    button: {
        marginTop: theme.spacing(2),
        marginLeft: theme.spacing(1),
        marginRight: theme.spacing(1),
    },
}));

function CreateRoom() {
    const classes = useStyles();

    return (
        <Container maxWidth="sm">
            <form noValidate autoComplete="off">
                <TextField
                    fullWidth
                    required
                    className={classes.textField}
                    id="room-name"
                    label="Room Name"
                />
                <TextField
                    fullWidth
                    multiline
                    required
                    className={classes.textField}
                    id="room-desc"
                    label="Room Description"
                />
                <TextField
                    id="start-time"
                    label="Start Time"
                    type="datetime-local"
                    className={classes.textField}
                    InputLabelProps={{
                        shrink: true,
                    }}
                />
                <br />
                <Button
                    className={classes.button}
                    variant="contained"
                    color="primary"
                >
                    Create
                </Button>
            </form>
        </Container>
    );
}

export default CreateRoom;
