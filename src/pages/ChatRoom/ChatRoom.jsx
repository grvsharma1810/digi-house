import React, { useState, useEffect, useRef } from "react";
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
    CardHeader,
    Card,
    IconButton,
    CardActions,
    CardContent,
} from "@material-ui/core";
import MessageSender from "./MessageSender";
import MessagesBox from "./MessagesBox";
import Spinner from "../../shared-components/Spinner";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import ChatHeader from "./ChatHeader";

const useStyles = makeStyles((theme) => ({
    content: {
        paddingTop: theme.spacing(2),
        paddingBottom: theme.spacing(2),
        height: "88%",
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
    const scrollRef = useRef();
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
                        .orderBy("timestamp", "asc")
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
                                setParticipant(doc.data());
                            });
                    }
                    setIsRoomDetailsLoading(false);
                } else {
                    // doc.data() will be undefined in this case
                    setIsRoomDetailsLoading(false);
                    alert("No such document!");                    
                }
            })
            .catch((error) => {
                setIsRoomDetailsLoading(false);
                alert(error.message);                
            });
    }, [roomId, loggedInUser]);

    useEffect(() => {
        scrollRef.current.scrollIntoView(false);
    }, [messages]);

    return (
        <>
            {isRoomDetailsLoading && <Spinner />}
            {!isRoomDetailsLoading && (
                <Container maxWidth="md" className={classes.content}>
                    <Box display="flex" flexDirection="column" height="100%">
                        <ChatHeader room={room} participant={participant} />
                        <MessagesBox messages={messages} />
                        <MessageSender room={room} participant={participant} />
                    </Box>
                </Container>
            )}
            <div ref={scrollRef}></div>
        </>
    );
}

export default ChatRoom;
