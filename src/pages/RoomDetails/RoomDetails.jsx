import React, { useEffect, useState } from "react";
import db, { firebase } from "../../firebase";
import { useParams, useNavigate } from "react-router-dom";
import { useUser } from "../../Providers/UserProvider";
import { makeStyles } from "@material-ui/core/styles";
import {
    Container,
    Grid,
    CircularProgress,
    Typography,
    Box,
    Paper,
    Avatar,
    Button,
} from "@material-ui/core";
import Spinner from "../../shared-components/Spinner";

const useStyles = makeStyles((theme) => ({
    content: {
        paddingTop: theme.spacing(2),
        paddingBottom: theme.spacing(2),
    },
    spinner: {
        textAlign: "center",
        padding: theme.spacing(4),
    },
    img: {
        width: "100%",
        height: "auto",
    },
    creatorBlock: {
        marginTop: theme.spacing(2),
        marginBottom: theme.spacing(2),
        padding: theme.spacing(2),
    },
    creatorBlockFlex: {
        marginTop: theme.spacing(1),
        gap: theme.spacing(2),
    },
}));

function RoomDetails() {
    const classes = useStyles();
    const { roomId } = useParams();
    const navigate = useNavigate();
    const [room, setRoom] = useState(null);
    const { loggedInUser } = useUser();
    const [isRoomDetailsLoading, setIsRoomDetailsLoading] = useState(true);
    console.log({ room }, room?.status === "live", room?.status === "saved");

    const startRoom = () => {
        if (room) {
            setIsRoomDetailsLoading(true);
            db.collection("rooms")
                .doc(room.roomId)
                .update({
                    status: "live",
                    startDateAndTime: firebase.firestore.Timestamp.now(),
                })
                .then((response) => {
                    db.collection("rooms")
                        .doc(room.roomId)
                        .collection("participants")
                        .doc(loggedInUser?.uid)
                        .set({
                            role: "creator",
                            uname: loggedInUser.displayName,
                            uphotoURL: loggedInUser?.photoURL,
                            uid: loggedInUser?.uid,
                            raisedHand: false,
                        })
                        .then(() => {
                            setIsRoomDetailsLoading(false);
                            console.log("Room Created Successfully");
                            navigate("chats");
                        })
                        .catch((error) => {
                            alert(error.message);
                        });
                })
                .catch((error) => {
                    alert(error.message);
                });
        }
    };

    const joinRoom = () => {
        if (room?.status !== "created") {
            setIsRoomDetailsLoading(true);
            db.collection("rooms")
                .doc(room.roomId)
                .collection("participants")
                .doc(loggedInUser?.uid)
                .set({
                    role:
                        room.uid === loggedInUser?.uid
                            ? "creator"
                            : "spectator",
                    uname: loggedInUser.displayName,
                    uphotoURL: loggedInUser?.photoURL,
                    uid: loggedInUser?.uid,
                    handRaised: false,
                })
                .then(() => {
                    console.log("Joined Inside Room");
                    navigate("chats");
                    setIsRoomDetailsLoading(false);
                })
                .catch((error) => {
                    alert(error.message);
                    setIsRoomDetailsLoading(false);
                });
        } else {
            alert("Room has not been started yet.");
        }
    };

    useEffect(() => {
        var docRef = db.collection("rooms").doc(roomId);
        docRef
            .get()
            .then((doc) => {
                if (doc.exists) {
                    setRoom({ ...doc.data(), roomId });
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
            {isRoomDetailsLoading && <Spinner />}
            {!isRoomDetailsLoading && (
                <Container maxWidth="md" className={classes.content}>
                    <Grid container spacing={2}>
                        <Grid item xs={12} sm={4}>
                            <img
                                className={classes.img}
                                src={`${room.roomPhotoURL}`}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <Typography variant="h4">{room.name}</Typography>
                            {room.status === "created" && (
                                <Box variant="subtitle1" fontWeight={500}>
                                    Starts at{" "}
                                    {room.startDateAndTime
                                        .toDate()
                                        .toLocaleString()}
                                </Box>
                            )}
                            {room.status !== "created" && (
                                <Box variant="subtitle1" fontWeight={500}>
                                    Started at{" "}
                                    {room.startDateAndTime
                                        .toDate()
                                        .toLocaleString()}
                                </Box>
                            )}
                            <Typography variant="subtitle1">
                                {room.description}
                            </Typography>
                            {room.status === "created" && (
                                <Typography
                                    variant="subtitle2"
                                    color="secondary"
                                >
                                    *Room has not been started yet.
                                </Typography>
                            )}
                            {room.status === "live" && (
                                <Typography variant="subtitle2" color="primary">
                                    Room is Live.
                                </Typography>
                            )}
                            {room.status === "saved" && (
                                <Typography
                                    variant="subtitle2"
                                    color="secondary"
                                >
                                    Room is Closed.
                                </Typography>
                            )}
                        </Grid>
                    </Grid>
                    <Paper elevation={3} className={classes.creatorBlock}>
                        <Box fontStyle="italic">Created By</Box>

                        <Box
                            display="flex"
                            className={classes.creatorBlockFlex}
                        >
                            <Avatar
                                aria-label="room"
                                src={`${room.uphotoURL}`}
                            ></Avatar>
                            <Box>
                                <Box fontSize={20}>{room.uname}</Box>
                                <Typography>{room.uemail}</Typography>
                            </Box>
                        </Box>
                    </Paper>
                    {room.status === "created" &&
                        room.uid === loggedInUser?.uid && (
                            <Grid align="center" fixed="true">
                                <Grid item xs={12} md={4}>
                                    <Button
                                        onClick={() => startRoom()}
                                        fullWidth
                                        size="large"
                                        variant="contained"
                                        color="primary"
                                    >
                                        Start
                                    </Button>
                                </Grid>
                            </Grid>
                        )}
                    {room.status === "live" && loggedInUser && (
                        <Grid align="center" fixed="true">
                            <Grid item xs={12} md={4}>
                                <Button
                                    onClick={() => joinRoom()}
                                    fullWidth
                                    size="large"
                                    variant="contained"
                                    color="primary"
                                >
                                    JOIN
                                </Button>
                            </Grid>
                        </Grid>
                    )}
                    {room.status === "saved" && loggedInUser && (
                        <Grid align="center" fixed="true">
                            <Grid item xs={12} md={4}>
                                <Button
                                    onClick={() => joinRoom()}
                                    fullWidth
                                    size="large"
                                    variant="contained"
                                    color="primary"
                                >
                                    VIEW
                                </Button>
                            </Grid>
                        </Grid>
                    )}
                </Container>
            )}
        </>
    );
}

export default RoomDetails;
