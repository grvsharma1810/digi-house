import React, { useEffect, useState } from "react";
import db from "../../firebase";
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

    const startRoom = () => {
        if (room) {
            db.collection("rooms")
                .doc(room.roomId)
                .update({
                    status: "live",
                })
                .then((response) => {
                    db.collection("rooms")
                        .doc(room.roomId)
                        .collection("participants")
                        .doc(room.uid)
                        .set({
                            role: "creator",
                            uname: room.uname,
                            uphotoURL: loggedInUser.photoURL,
                            uid: loggedInUser.uid,
                        })
                        .then(() => {
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

    const enterRoom = () => {
        if (room?.status === "live" || room?.status === "saved") {
            setIsRoomDetailsLoading(true);
            db.collection("rooms")
                .doc(room.roomId)
                .collection("participants")
                .doc(room.uid)
                .set({
                    role:
                        room.uid === loggedInUser.uid ? "creator" : "spectator",
                    uname: room.uname,
                    uphotoURL: loggedInUser.photoURL,
                    uid: loggedInUser.uid,
                })
                .then(() => {
                    console.log("Entered Inside Room");
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
                    <Grid container spacing={2}>
                        <Grid item xs={12} sm={4}>
                            <img
                                className={classes.img}
                                src="https://source.unsplash.com/random/1600x900"
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <Typography variant="h4">{room.name}</Typography>
                            <Box variant="subtitle1" fontWeight={500}>
                                Starts at{" "}
                                {room.startDateAndTime
                                    .toDate()
                                    .toLocaleString()}
                            </Box>
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
                        room.uid === loggedInUser.uid && (
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
                    {room.status === "live" ||
                        (room.status === "saved" && (
                            <Grid align="center" fixed="true">
                                <Grid item xs={12} md={4}>
                                    <Button
                                        onClick={() => enterRoom()}
                                        fullWidth
                                        size="large"
                                        variant="contained"
                                        color="primary"
                                    >
                                        Enter
                                    </Button>
                                </Grid>
                            </Grid>
                        ))}
                </Container>
            )}
        </>
    );
}

export default RoomDetails;
