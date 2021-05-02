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
} from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
    content: {
        paddingTop: theme.spacing(2),
        paddingBottom: theme.spacing(2),
    },
    spinner: {
        textAlign: "center",
        padding: theme.spacing(4),
    },
    header: {},
}));

function ChatRoom() {
    const navigate = useNavigate();
    const { loggedInUser } = useUser();
    const classes = useStyles();
    const { roomId } = useParams();
    const [room, setRoom] = useState(null);
    const [messages, setMessages] = useState([]);
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
    }, [roomId]);

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
                    <Paper elevation={4}>
                        <Box p={1}>{room.name}</Box>
                    </Paper>
                </Container>
            )}
        </>
    );
}

export default ChatRoom;
