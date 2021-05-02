import React from "react";
import { useNavigate } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import SwipeableDrawer from "@material-ui/core/SwipeableDrawer";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import LiveTvIcon from "@material-ui/icons/LiveTv";
import MeetingRoomIcon from "@material-ui/icons/MeetingRoom";

const useStyles = makeStyles({
    list: {
        width: 250,
    },
});

export default function Drawer({ drawerOpen, toggleDrawer }) {
    const classes = useStyles();
    const navigate = useNavigate();

    const list = () => (
        <div
            className={classes.list}
            role="presentation"
            onClick={toggleDrawer(false)}
            onKeyDown={toggleDrawer(false)}
        >
            <List>
                <ListItem
                    button
                    key="All Chatrooms"
                    onClick={() => navigate("/")}
                >
                    <ListItemIcon>
                        <LiveTvIcon />
                    </ListItemIcon>
                    <ListItemText primary="All Chatrooms" />
                </ListItem>
                <ListItem
                    button
                    key="Your Chatrooms"
                    onClick={() => navigate("/create-room")}
                >
                    <ListItemIcon>
                        <MeetingRoomIcon />
                    </ListItemIcon>
                    <ListItemText primary="Create Your Room" />
                </ListItem>
                <ListItem
                    button
                    key="Your Chatrooms"
                    onClick={() => navigate("/your-chatrooms")}
                >
                    <ListItemIcon>
                        <MeetingRoomIcon />
                    </ListItemIcon>
                    <ListItemText primary="Your Chatrooms" />
                </ListItem>
            </List>
        </div>
    );

    return (
        <SwipeableDrawer
            anchor="left"
            open={drawerOpen}
            onClose={toggleDrawer(false)}
            onOpen={toggleDrawer(true)}
        >
            {list()}
        </SwipeableDrawer>
    );
}
