import React, { useState } from "react";
import { useUser } from "../../Providers/UserProvider";
import db, { firebase } from "../../firebase";
import { useNavigate } from "react-router-dom";
import Spinner from "../../shared-components/Spinner";
import {
    Button,
    Container,
    TextField,
    FormControl,
    FormLabel,
    Radio,
    RadioGroup,
    FormControlLabel,
    Grid,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
    textField: {
        marginTop: theme.spacing(1),
    },
    dateTimeField: {
        marginTop: theme.spacing(2),
    },
    button: {
        marginTop: theme.spacing(4),
    },
    radio: {
        marginTop: theme.spacing(3),
    },
}));

const initialFormValues = {
    roomName: "",
    roomDesc: "",
    startDateAndTime: "2021-05-01T10:30",
    type: "",
};

function CreateRoom() {
    const navigate = useNavigate();
    const classes = useStyles();
    const { loggedInUser } = useUser();
    const [formValue, setFormValue] = useState(initialFormValues);
    const [isLoading, setIsLoading] = useState(false);

    const createRoom = (event) => {
        event.preventDefault();
        event.stopPropagation();
        console.log(formValue);
        setIsLoading(true);
        db.collection("rooms")
            .add({
                uid: loggedInUser.uid,
                uname: loggedInUser.displayName,
                uphotoURL: loggedInUser.photoURL,
                uemail: loggedInUser.email,

                name: formValue.roomName,
                startDateAndTime: firebase.firestore.Timestamp.fromDate(
                    new Date(formValue.startDateAndTime)
                ),
                description: formValue.roomDesc,
                type: formValue.type,
                status: "created",
            })
            .then((room) => {
                setIsLoading(false);
                navigate(`/rooms/${room.id}`);
            })
            .catch((err) => {
                setIsLoading(false);
                alert(err.message);
            });
    };

    return (
        <>
            {isLoading && <Spinner />}
            {!isLoading && (
                <Container maxWidth="sm">
                    <form onSubmit={createRoom} noValidate autoComplete="off">
                        <TextField
                            fullWidth
                            required
                            value={formValue.roomName}
                            onChange={(e) =>
                                setFormValue((value) => ({
                                    ...value,
                                    roomName: e.target.value,
                                }))
                            }
                            className={classes.textField}
                            id="room-name"
                            label="Room Name"
                        />
                        <TextField
                            fullWidth
                            multiline
                            required
                            value={formValue.roomDesc}
                            onChange={(e) =>
                                setFormValue((value) => ({
                                    ...value,
                                    roomDesc: e.target.value,
                                }))
                            }
                            className={classes.textField}
                            id="room-desc"
                            label="Room Description"
                        />
                        <TextField
                            fullWidth
                            value={formValue.startDateAndTime}
                            onChange={(e) =>
                                setFormValue((value) => ({
                                    ...value,
                                    startDateAndTime: e.target.value,
                                }))
                            }
                            className={classes.dateTimeField}
                            id="start-time"
                            label="Start Time"
                            type="datetime-local"
                            InputLabelProps={{
                                shrink: true,
                            }}
                        />
                        <FormControl
                            component="fieldset"
                            className={classes.radio}
                        >
                            <FormLabel component="legend">Type</FormLabel>
                            <RadioGroup
                                aria-label="type"
                                name="type"
                                value={formValue.type}
                                onChange={(e) =>
                                    setFormValue((value) => ({
                                        ...value,
                                        type: e.target.value,
                                    }))
                                }
                            >
                                <FormControlLabel
                                    value="public"
                                    control={<Radio />}
                                    label="Public"
                                />
                                <FormControlLabel
                                    value="private"
                                    control={<Radio />}
                                    label="Private"
                                />
                            </RadioGroup>
                        </FormControl>
                        <br />
                        <Grid align="center" className={classes.button}>
                            <Button
                                type="submit"
                                variant="contained"
                                color="primary"
                                size="large"
                            >
                                Create
                            </Button>
                        </Grid>
                    </form>
                </Container>
            )}
        </>
    );
}

export default CreateRoom;
