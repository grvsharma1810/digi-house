import React, { useEffect, useState } from "react";
import db from "../../firebase";
import { useParams } from "react-router-dom";
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
    const [room, setRoom] = useState(null);
    const { loggedInUser } = useUser();
    const [isRoomDetailsLoading, setIsRoomDetailsLoading] = useState(true);

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
                            <Box variant="subtitle1" fontWeight={600}>
                                Start at{" "}
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
                            <Grid align="center" fixed>
                                <Grid item xs={12} md={4}>
                                    <Button
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
                    {room.status === "live" && (
                        <Grid align="center" fixed>
                            <Grid item xs={12} md={4}>
                                <Button
                                    fullWidth
                                    size="large"
                                    variant="contained"
                                    color="primary"
                                >
                                    Enter
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
