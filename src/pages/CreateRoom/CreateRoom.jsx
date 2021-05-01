import React, { useState } from "react";
import { useUser } from "../../Providers/UserProvider";
import db from "../../firebase";
import {
    Button,
    Container,
    TextField,
    FormControl,
    FormLabel,
    Radio,
    RadioGroup,
    FormControlLabel,
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
    const classes = useStyles();
    const { loggedInUser } = useUser();
    const [formValue, setFormValue] = useState(initialFormValues);

    const createRoom = (event) => {
        event.preventDefault();
        event.stopPropagation();
        console.log(formValue);
        db.collection("rooms").add({
            uid: loggedInUser.uid,
            name: formValue.roomName,
            startDateAndTime: formValue.startDateAndTime,
            description: formValue.roomDesc,
            type: formValue.type,
            saved: false,
        });
        // .then((room) => {
        //     console.log(room.id);
        //     db.collection("rooms")
        //         .doc(room.id)
        //         .collection("participants")
        //         .add({
        //             name: "Ankit",
        //         });
        // })
        // .catch((err) => {
        //     alert(err);
        // });
    };

    return (
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
                <FormControl component="fieldset" className={classes.radio}>
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
                <Button
                    className={classes.button}
                    type="submit"
                    variant="contained"
                    color="primary"
                    size="large"
                >
                    Create
                </Button>
            </form>
        </Container>
    );
}

export default CreateRoom;
