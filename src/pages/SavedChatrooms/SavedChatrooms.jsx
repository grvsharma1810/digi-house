import React from "react";
import { useUser } from "../../Providers/UserProvider";
import db from "../../firebase";
import RoomCard from "../../shared-components/RoomCard";
import { Box, Grid, Container } from "@material-ui/core";

function SavedChatrooms() {
    const [rooms, setRooms] = React.useState([]);
    const { loggedInUser } = useUser();    
    React.useEffect(() => {
        if (loggedInUser) {
            db.collection("rooms")
                .where("uid", "==", loggedInUser.uid)
                .onSnapshot((querySnapshot) => {
                    setRooms(
                        querySnapshot.docs
                            .map((doc) => {
                                return { ...doc.data(), roomId: doc.id };
                            })
                            .filter((data) => data.status === "saved")
                    );
                });
        }
    }, [loggedInUser]);

    return (
        <Container>
            <Box fontSize={20} mt={2} fontWeight={500}>
                Saved Chatrooms
            </Box>
            {rooms.length == 0 && (
                <Box fontSize={16} mt={2}>
                    No Room Available
                </Box>
            )}
            {rooms.length > 0 && (
                <Box mt={2} mb={2}>
                    <Grid container spacing={3}>
                        {rooms.map((room) => {
                            return (
                                <Grid
                                    item
                                    xs={12}
                                    sm={6}
                                    md={4}
                                    key={room.roomId}
                                >
                                    <RoomCard room={room} />
                                </Grid>
                            );
                        })}
                    </Grid>
                </Box>
            )}
        </Container>
    );
}

export default SavedChatrooms;
