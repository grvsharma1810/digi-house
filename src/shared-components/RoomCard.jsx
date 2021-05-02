import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardMedia from "@material-ui/core/CardMedia";
import CardActionArea from "@material-ui/core/CardActionArea";
import Avatar from "@material-ui/core/Avatar";
import { red } from "@material-ui/core/colors";
import { useNavigate } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
    root: {
        width: "100%",
    },
    media: {
        height: 0,
        paddingTop: "56.25%", // 16:9
    },
    avatar: {
        backgroundColor: red[500],
    },
}));

export default function RoomCard({ room }) {
    const navigate = useNavigate();
    const classes = useStyles();

    return (
        <Card
            className={classes.root}
            onClick={() => navigate(`/rooms/${room.roomId}`)}
        >
            <CardActionArea>
                <CardHeader
                    avatar={
                        <Avatar
                            aria-label="room"
                            src={`${room.uphotoURL}`}
                        ></Avatar>
                    }
                    title={room.name}
                    subheader={
                        <>
                            <div>{`Starts at ${room.startDateAndTime
                                .toDate()
                                .toLocaleString()}`}</div>
                            <div>from - {room.uname}</div>
                        </>
                    }
                />
                <CardMedia
                    className={classes.media}
                    image="https://source.unsplash.com/random/1600x900"
                    title={room.name}
                />
                {/* <CardContent>
                    From -
                    <Typography
                        variant="body2"
                        color="textSecondary"
                        component="p"
                    >
                        {room.uname}
                    </Typography>
                </CardContent>
                <CardActions disableSpacing>
                    <IconButton aria-label="add to favorites">
                        <FavoriteIcon />
                    </IconButton>
                    <IconButton aria-label="share">
                        <ShareIcon />
                    </IconButton>
                </CardActions> */}
            </CardActionArea>
        </Card>
    );
}
