import React, { useEffect, useState } from "react";
import db, { firebase } from "../../firebase";
import { makeStyles } from "@material-ui/core/styles";
import "emoji-mart/css/emoji-mart.css";
import { Picker } from "emoji-mart";
import {
    Box,
    TextField,
    IconButton,
    FormControl,
    Input,
    InputLabel,
    InputAdornment,
    OutlinedInput,
} from "@material-ui/core";
import SendIcon from "@material-ui/icons/Send";
import PanToolIcon from "@material-ui/icons/PanTool";
import EmojiEmotionsIcon from "@material-ui/icons/EmojiEmotions";

const useStyles = makeStyles((theme) => ({}));

function MessageSender({ room, participant }) {
    const classes = useStyles();
    const [emojiPickerView, setEmojiPickerView] = useState(false);
    const [handRaised, setHandRaised] = useState(false);
    const [message, setMessage] = useState("");

    const toggleHandRaise = () => {
        let newHandRaised = !handRaised;
        setHandRaised(newHandRaised);
        db.collection("rooms")
            .doc(room.roomId)
            .collection("participants")
            .doc(participant.uid)
            .update({
                handRaised: newHandRaised,
            });
    };

    const sendMessage = (message) => {
        setMessage("");
        db.collection("rooms").doc(room.roomId).collection("messages").add({
            timestamp: firebase.firestore.FieldValue.serverTimestamp(),
            uid: participant.uid,
            uname: participant.uname,
            uphotoURL: participant.uphotoURL,
            content: message,
        });
    };

    const handleMessageSend = (event) => {
        event.stopPropagation();
        event.preventDefault();
        if (event.which == 13) {
            sendMessage(message);
        }
    };

    const addEmoji = (emoji) => {
        setMessage((message) => message.concat(emoji.native));
    };

    useEffect(() => {
        if (participant) {
            setHandRaised(participant.handRaised);
        }
    }, [participant]);

    return (
        <>
            {emojiPickerView && (
                <Box position="relative">
                    <Picker
                        onSelect={addEmoji}
                        style={{
                            width: "100%",
                            position: "absolute",
                            bottom: "0",
                        }}
                    />
                </Box>
            )}
            <Box display="flex" alignItems="flex-end" bgcolor="grey">
                <FormControl fullWidth variant="outlined">
                    <InputLabel htmlFor="standard-adornment-message">
                        Message
                    </InputLabel>
                    <OutlinedInput
                        multiline
                        disabled={participant?.role === "spectator"}
                        id="standard-adornment-message"
                        type="text"
                        value={message}
                        onChange={(event) =>
                            setMessage(() => event.target.value)
                        }
                        onKeyUp={handleMessageSend}
                        endAdornment={
                            <InputAdornment position="end">
                                <IconButton
                                    disabled={participant?.role === "spectator"}
                                    aria-label="toggle message visibility"
                                    onClick={() =>
                                        setEmojiPickerView((view) => !view)
                                    }
                                    edge="end"
                                >
                                    <EmojiEmotionsIcon />
                                </IconButton>
                            </InputAdornment>
                        }
                        labelWidth={70}
                    />
                </FormControl>
                <Box display="flex">
                    <IconButton
                        disabled={participant?.role === "spectator"}
                        onClick={() => sendMessage(message)}
                    >
                        <SendIcon />
                    </IconButton>
                    {room?.uid !== participant?.uid && (
                        <IconButton
                            color={handRaised ? "secondary" : "default"}
                            onClick={toggleHandRaise}
                        >
                            <PanToolIcon />
                        </IconButton>
                    )}
                </Box>
            </Box>
        </>
    );
}

export default MessageSender;
