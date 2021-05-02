import "./Home.css";
import React from "react";
import { useNavigate } from "react-router-dom";
import { Button, Box, Grid, Container } from "@material-ui/core";
import { useUser } from "../../Providers/UserProvider";
import db from "../../firebase";
import RoomCard from "../../shared-components/RoomCard";

function Home() {
    const [rooms, setRooms] = React.useState([]);
    const { loggedInUser } = useUser();
    const navigate = useNavigate();

    React.useEffect(() => {
        db.collection("rooms")
            .where("type", "==", "public")
            .orderBy("startDateAndTime", "desc")
            .onSnapshot((querySnapshot) => {
                setRooms(
                    querySnapshot.docs.map((doc) => {
                        return { ...doc.data(), roomId: doc.id };
                    })
                );
            });
    }, [loggedInUser]);

    return (
        <Container>
            <Box fontSize={26} mt={2}>Handpicked Chatroom For You</Box>
            <Box mt={2} mb={2}>
                <Grid container spacing={3}>
                    {rooms.map((room) => {
                        return (
                            <Grid item xs={12} sm={6} md={4} key={room.roomId}>
                                <RoomCard room={room} />
                            </Grid>
                        );
                    })}
                </Grid>
            </Box>
        </Container>
    );
}

export default Home;
