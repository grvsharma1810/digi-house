import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import { Avatar, Box, Container, Tooltip } from "@material-ui/core";
import { useParams } from "react-router-dom";
import db from "../../firebase";

const useStyles = makeStyles((theme) => ({
    participantsBox: {
        gap: theme.spacing(2),
    },
    largeAvatar: {
        width: theme.spacing(7),
        height: theme.spacing(7),
        cursor: "pointer",
    },
}));

function HandsRaised({ dialogOpen, setDialogOpen }) {
    const [isLoading, setIsLoading] = useState(false);
    const [
        participantsWithRaisedHands,
        setParticipantsWithRaisedHands,
    ] = useState([]);
    console.log("From Dialog", { participantsWithRaisedHands });
    const classes = useStyles();
    const { roomId } = useParams();

    const allowToWrite = (participant) => {
        console.log(participant);
        db.collection("rooms")
            .doc(roomId)
            .collection("participants")
            .doc(participant.uid)
            .update({
                handRaised: false,
                role: "writer",
            });
    };

    useEffect(() => {
        db.collection("rooms")
            .doc(roomId)
            .collection("participants")
            .onSnapshot((querySnapshot) => {
                setParticipantsWithRaisedHands(
                    querySnapshot.docs
                        .map((doc) => doc.data())
                        .filter((data) => {
                            return data.handRaised === true;
                        })
                );
            });
    }, [roomId]);

    return (
        <Dialog
            fullWidth
            maxWidth="md"
            open={dialogOpen}
            onClose={() => setDialogOpen(false)}
            aria-labelledby="max-width-dialog-title"
        >
            <DialogTitle id="max-width-dialog-title">Hands Raised</DialogTitle>
            <DialogContent>
                {participantsWithRaisedHands?.length > 0 && (
                    <Box display="flex" className={classes.participantsBox}>
                        {participantsWithRaisedHands.map((participant) => {
                            return (
                                <Tooltip
                                    onClick={() => allowToWrite(participant)}
                                    title={participant.uname}
                                    aria-label="participant"
                                    key={participant.uid}
                                >
                                    <Avatar
                                        src={participant.uphotoURL}
                                        className={classes.largeAvatar}
                                    />
                                </Tooltip>
                            );
                        })}
                    </Box>
                )}
                {participantsWithRaisedHands?.length === 0 && (
                    <p>No Hands Raised</p>
                )}
            </DialogContent>
            <DialogActions>
                <Button onClick={() => setDialogOpen(false)} color="primary">
                    Close
                </Button>
            </DialogActions>
        </Dialog>
    );
}

export default HandsRaised;
