import React, { useEffect, useRef } from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
    Container,
    Grid,
    Typography,
    Box,
    Paper,
    CircularProgress,
    Avatar,
} from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
    senderMessage: {
        width: "fit-content",
        marginRight: theme.spacing(6),
        padding: theme.spacing(2),
    },
    chatBox: {
        overflowY: "auto",
        overflowX: "hidden",
    },
}));

function MessagesBox({ messages }) {
    const classes = useStyles();

    return (
        <Box pt={3} pb={2} height="100%" className={classes.chatBox}>
            {messages.map((message) => {
                return (
                    <Grid container spacing={2} key={message.messageId}>
                        <Grid item>
                            <Avatar src={message.uphotoURL} />
                        </Grid>
                        <Grid item xs>
                            <Paper
                                variant="outlined"
                                className={classes.senderMessage}
                            >
                                <Typography>{message.content}</Typography>
                            </Paper>
                        </Grid>
                    </Grid>
                );
            })}
        </Box>
    );
}

export default MessagesBox;
