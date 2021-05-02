import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { useNavigate } from "react-router-dom";
import { useUser } from "../../Providers/UserProvider";
import db from "../../firebase";
import {
    Typography,
    Box,
    Paper,
    IconButton,
    Menu,
    MenuItem,
} from "@material-ui/core";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import Button from "@material-ui/core/Button";
import HandsRaised from "./HandsRaised";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";

const useStyles = makeStyles((theme) => ({
    chatHeader: {
        position: "relative",
        width: "100%",
    },
    chatOptions: {
        position: "absolute",
        top: theme.spacing(2),
        right: theme.spacing(2),
    },
}));

function AlertDialog({ alertDialogOpen, handleClose, room }) {
    const navigate = useNavigate();
    const saveRoom = (save) => {
        if (save) {
            db.collection("rooms").doc(room.roomId).update({
                status: "saved",
            });
        } else {
            db.collection("rooms").doc(room.roomId).delete();
        }
        handleClose();
        navigate("/");
    };

    return (
        <Dialog
            open={alertDialogOpen}
            onClose={handleClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
        >
            <DialogTitle id="alert-dialog-title">
                {"Use Google's location service?"}
            </DialogTitle>
            <DialogContent>
                <DialogContentText id="alert-dialog-description">
                    Would you like to save this chat to refer in future ?
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button onClick={() => saveRoom(false)} color="primary">
                    No
                </Button>
                <Button
                    onClick={() => saveRoom(true)}
                    color="primary"
                    autoFocus
                >
                    Yes
                </Button>
            </DialogActions>
        </Dialog>
    );
}

function ChatMenu({
    anchorEl,
    setAnchorEl,
    room,
    participant,
    setDialogOpen,
    setAlertDialogOpen,
}) {
    const navigate = useNavigate();
    const { loggedInUser } = useUser();

    const navigateToAllParticipants = () => {
        navigate(`/rooms/${room.roomId}/participants`);
        setAnchorEl(null);
    };

    const leaveRoom = () => {
        db.collection("rooms")
            .doc(room.roomId)
            .collection("participants")
            .doc(participant.uid)
            .delete();
        navigate(`/`);
    };

    return (
        <Menu
            id="chat-menu"
            anchorEl={anchorEl}
            keepMounted
            open={Boolean(anchorEl)}
            onClose={() => setAnchorEl(null)}
        >
            <MenuItem onClick={navigateToAllParticipants}>
                All Participants
            </MenuItem>
            {room.uid === loggedInUser.uid && (
                <>
                    <MenuItem
                        onClick={() => {
                            setDialogOpen(true);
                            setAnchorEl(null);
                        }}
                    >
                        Hands Raised
                    </MenuItem>
                    <MenuItem
                        onClick={() => {
                            setAlertDialogOpen(true);
                            setAnchorEl(null);
                        }}
                    >
                        Close Room
                    </MenuItem>
                </>
            )}
            {room.uid !== loggedInUser.uid && (
                <MenuItem onClick={leaveRoom}>Leave Room</MenuItem>
            )}
        </Menu>
    );
}

function ChatHeader({ room, participant }) {
    const classes = useStyles();
    const [anchorEl, setAnchorEl] = React.useState(null);
    const [dialogOpen, setDialogOpen] = useState(false);
    const [alertDialogOpen, setAlertDialogOpen] = React.useState(false);

    const handleAlertDialogClose = () => {
        setAlertDialogOpen(false);
    };

    return (
        <>
            <Paper className={classes.chatHeader}>
                {room.status != "saved" && (
                    <IconButton
                        onClick={(event) => setAnchorEl(event.currentTarget)}
                        aria-label="settings"
                        className={classes.chatOptions}
                    >
                        <MoreVertIcon />
                    </IconButton>
                )}
                <ChatMenu
                    anchorEl={anchorEl}
                    setAnchorEl={setAnchorEl}
                    room={room}
                    participant={participant}
                    setDialogOpen={setDialogOpen}
                    setAlertDialogOpen={setAlertDialogOpen}
                />
                <Box p={2}>
                    <Typography variant="h5">{room.name}</Typography>
                    <Typography variant="subtitle1">
                        {room.description}
                    </Typography>
                    <Typography variant="body2">
                        Started at{" "}
                        {room.startDateAndTime.toDate().toLocaleString()}
                    </Typography>
                </Box>
            </Paper>
            <HandsRaised
                dialogOpen={dialogOpen}
                setDialogOpen={setDialogOpen}
            />
            <AlertDialog
                alertDialogOpen={alertDialogOpen}
                handleClose={handleAlertDialogClose}
                room={room}
            />
        </>
    );
}

export default ChatHeader;
