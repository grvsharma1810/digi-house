import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import clsx from "clsx";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import CardActionArea from "@material-ui/core/CardActionArea";
import Collapse from "@material-ui/core/Collapse";
import Avatar from "@material-ui/core/Avatar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import { red } from "@material-ui/core/colors";
import FavoriteIcon from "@material-ui/icons/Favorite";
import ShareIcon from "@material-ui/icons/Share";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import MoreVertIcon from "@material-ui/icons/MoreVert";

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
    const classes = useStyles();

    return (
        <Card className={classes.root}>
            <CardActionArea>
                <CardHeader
                    avatar={<Avatar aria-label="room">{room.uname[0]}</Avatar>}
                    title={room.name}
                    subheader={
                        <>
                            <div>{`Starts at ${new Date(
                                room.startDateAndTime
                            ).toLocaleString()}`}</div>
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
