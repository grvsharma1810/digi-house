import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
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
        cursor: 'pointer'
    },
}));

function ParticipantsBox({ name, participants }) {
    console.log(participants);
    const classes = useStyles();
    return (
        <>
            {participants.length > 0 && (
                <>
                    <Box fontSize={20} mt={2} mb={2} fontWeight={500}>
                        {name}
                    </Box>
                    <Box display="flex" className={classes.participantsBox}>
                        {participants.map((participant) => {
                            return (
                                <Tooltip
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
                </>
            )}
        </>
    );
}

function Participants() {
    const [isLoading, setIsLoading] = useState(false);
    const [participants, setParticipants] = useState([]);
    const classes = useStyles();
    const { roomId } = useParams();

    useEffect(() => {
        db.collection("rooms")
            .doc(roomId)
            .collection("participants")
            .onSnapshot((querySnapshot) => {
                setParticipants(
                    querySnapshot.docs.map((doc) => {
                        return doc.data();
                    })
                );
            });
    }, [roomId]);

    return (
        <>
            <Container>
                <ParticipantsBox
                    name="Creator"
                    participants={participants.filter(
                        (participant) => participant.role === "creator"
                    )}
                />
                <ParticipantsBox
                    name="Writers"
                    participants={participants.filter(
                        (participant) => participant.role === "writer"
                    )}
                />
                <ParticipantsBox
                    name="Spectators"
                    participants={participants.filter(
                        (participant) => participant.role === "spectator"
                    )}
                />
            </Container>
        </>
    );
}

export default Participants;
