import React from "react";
import db from "../../firebase";
import { useParams } from "react-router-dom";

function RoomDetails() {
    const { roomId } = useParams();
    console.log(roomId);
    return <div>Room Details</div>;
}

export default RoomDetails;
