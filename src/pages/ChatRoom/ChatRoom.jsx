import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useUser } from "../../Providers/UserProvider";
import db from "../../firebase";
import { makeStyles } from "@material-ui/core/styles";
import {
    Container,
    Grid,
    Typography,
    Box,
    Paper,
    CircularProgress,
    Avatar,
} from "@material-ui/core";
import MessageSender from "./MessageSender";

const useStyles = makeStyles((theme) => ({
    content: {
        paddingTop: theme.spacing(2),
        paddingBottom: theme.spacing(2),
    },
    spinner: {
        textAlign: "center",
        padding: theme.spacing(4),
    },
    senderMessage: {
        maxWidth: "100%",
        width: "fit-content",
        marginRight: theme.spacing(6),
        padding: theme.spacing(2),
    },
}));

function ChatRoom() {
    const navigate = useNavigate();
    const { loggedInUser } = useUser();
    const classes = useStyles();
    const { roomId } = useParams();
    const [room, setRoom] = useState(null);
    const [messages, setMessages] = useState([]);
    const [participant, setParticipant] = useState(null);
    const [isRoomDetailsLoading, setIsRoomDetailsLoading] = useState(true);

    useEffect(() => {
        var roomDocRef = db.collection("rooms").doc(roomId);
        roomDocRef
            .get()
            .then((doc) => {
                if (doc.exists) {
                    setRoom({ ...doc.data(), roomId });
                    db.collection("rooms")
                        .doc(roomId)
                        .collection("messages")
                        .onSnapshot((querySnapshot) => {
                            setMessages(
                                querySnapshot.docs.map((doc) => {
                                    return { ...doc.data(), messageId: doc.id };
                                })
                            );
                        });

                    if (loggedInUser) {
                        db.collection("rooms")
                            .doc(roomId)
                            .collection("participants")
                            .doc(loggedInUser.uid)
                            .onSnapshot((doc) => {
                                console.log(doc.data());
                                setParticipant(doc.data());
                            });
                    }
                    setIsRoomDetailsLoading(false);
                } else {
                    // doc.data() will be undefined in this case
                    setIsRoomDetailsLoading(false);
                    alert("No such document!");
                    console.log("No such document!");
                }
            })
            .catch((error) => {
                setIsRoomDetailsLoading(false);
                alert(error.message);
                console.log("Error getting document:", error);
            });
    }, [roomId, loggedInUser]);

    return (
        <>
            {isRoomDetailsLoading && (
                <Container className={classes.spinner}>
                    <CircularProgress
                        color="secondary"
                        size={60}
                        thickness={4}
                    />
                </Container>
            )}
            {!isRoomDetailsLoading && (
                <Container maxWidth="md" className={classes.content}>
                    <Paper>
                        <Box p={2}>
                            <Typography variant="h5">{room.name}</Typography>
                            <Typography variant="subtitle1">
                                {room.description}
                            </Typography>
                            <Typography variant="body2">
                                Started at{" "}
                                {room.startDateAndTime
                                    .toDate()
                                    .toLocaleString()}
                            </Typography>
                        </Box>
                    </Paper>
                    <Box
                        mt={3}
                        mb={2}
                        component="div"
                        overflow="visible"
                        height="100%"
                    >
                        <Grid container spacing={2}>
                            <Grid item>
                                <Avatar src={loggedInUser.photoURL} />
                            </Grid>
                            <Grid item xs>
                                <Paper
                                    variant="outlined"
                                    className={classes.senderMessage}
                                >
                                    <Typography>
                                        Truncation should be conditionally
                                        applicable on this long line of text as
                                        this is a much longer line than what the
                                        container can support.
                                    </Typography>
                                </Paper>
                            </Grid>
                        </Grid>                                                                                 
                    </Box>
                    <MessageSender room={room} participant={participant} />
                </Container>
            )}
        </>
    );
}

export default ChatRoom;
