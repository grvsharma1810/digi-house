import React from "react";
import { useUser } from "../../Providers/UserProvider";
import db from "../../firebase";
import RoomCard from "../../shared-components/RoomCard";
import { Box, Grid } from "@material-ui/core";

function YourChatrooms() {
    const [rooms, setRooms] = React.useState([]);
    const { loggedInUser } = useUser();
    console.log(rooms);

    React.useEffect(() => {
        if (loggedInUser) {
            db.collection("rooms")
                .where("uid", "==", loggedInUser.uid)
                .onSnapshot((querySnapshot) => {
                    setRooms(
                        querySnapshot.docs.map((doc) => {
                            return { ...doc.data(), roomId: doc.id };
                        })
                    );
                });
        }
    }, [loggedInUser]);

    return (
        <Box m={3}>
            <Grid container spacing={3}>
                {rooms.map((room) => {
                    return (
                        <Grid item xs={12} sm={6} md={4}>
                            <RoomCard room={room} />
                        </Grid>
                    );
                })}
            </Grid>
        </Box>
    );
}

export default YourChatrooms;
