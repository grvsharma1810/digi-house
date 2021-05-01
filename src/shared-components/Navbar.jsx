import React from "react";

import { makeStyles, withStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import { auth, provider } from "../firebase";
import { useUser } from "../Providers/UserProvider";
import green from "@material-ui/core/colors/green";
import red from "@material-ui/core/colors/red";
import deepOrange from "@material-ui/core/colors/deepOrange";
import { Avatar } from "@material-ui/core";
// import IconButton from "@material-ui/core/IconButton";
// import MenuIcon from "@material-ui/icons/Menu";

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    title: {
        flexGrow: 1,
    },
    loginButton: {
        color: "white",
        backgroundColor: green[500],
        "&:hover": {
            backgroundColor: green[700],
        },
        marginLeft: theme.spacing(1),
    },
    logoutButton: {
        color: "white",
        backgroundColor: red[500],
        "&:hover": {
            backgroundColor: red[700],
        },
        marginLeft: theme.spacing(1),
    },
    orange: {
        color: theme.palette.getContrastText(deepOrange[500]),
        backgroundColor: deepOrange[500],
    },
}));

function Navbar() {
    const classes = useStyles();
    const { loggedInUser } = useUser();

    const login = () => {
        auth.signInWithPopup(provider)
            .then((result) => console.log(result))
            .catch((error) => alert(error.message));
    };

    const logout = () => {
        auth.signOut();
    };

    return (
        <>
            <div className={classes.root}>
                <AppBar position="static">
                    <Toolbar>
                        <Typography variant="h6" className={classes.title}>
                            DigiHouse
                        </Typography>
                        {!loggedInUser && (
                            <Button
                                className={classes.loginButton}
                                color="inherit"
                                variant="contained"
                                onClick={login}
                            >
                                Login
                            </Button>
                        )}
                        {loggedInUser && (
                            <>
                                <Avatar
                                    alt={loggedInUser.displayName}
                                    src="/static/images/avatar/1.jpg"
                                    className={classes.orange}
                                />
                                <Button
                                    className={classes.logoutButton}
                                    color="inherit"
                                    variant="contained"
                                    onClick={logout}
                                >
                                    Log Out
                                </Button>
                            </>
                        )}
                    </Toolbar>
                </AppBar>
            </div>
        </>
    );
}

export default Navbar;
