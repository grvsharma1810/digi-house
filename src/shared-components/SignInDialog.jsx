import React from "react";
import Button from "@material-ui/core/Button";
import DialogTitle from "@material-ui/core/DialogTitle";
import Dialog from "@material-ui/core/Dialog";
import {
    DialogActions,
    DialogContent,
    DialogContentText,
} from "@material-ui/core";
import { auth, provider } from "../firebase";

function SignInDialog(props) {
    const { onClose, open } = props;

    const handleClose = () => {
        onClose();
    };

    const signIn = () => {
        auth.signInWithPopup(provider)
            .then(() => {})
            .catch((error) => alert(error.message));
    };

    return (
        <Dialog
            onClose={handleClose}
            aria-labelledby="signin-dialog-title"
            open={open}
        >
            <DialogTitle id="signin-dialog-title">Login</DialogTitle>
            <DialogContent>
                <DialogContentText>
                    Looks like you are new here!
                </DialogContentText>
                <Button onClick={signIn} variant="contained" color="primary">
                    Sign In With Google
                </Button>
            </DialogContent>
            <DialogActions>
                {/* <Button
                    onClick={() => onClose(user)}
                    variant="contained"
                    color="primary"
                >
                    Close
                </Button> */}
            </DialogActions>
        </Dialog>
    );
}

export default SignInDialog;
