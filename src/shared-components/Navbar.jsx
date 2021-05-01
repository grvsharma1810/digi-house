import React from "react";

import { makeStyles } from "@material-ui/core/styles";
import { useNavigate } from "react-router-dom";
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
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    menuButton: {
        marginLeft: theme.spacing(0),
    },
    title: {
        flexGrow: 1,
        cursor: "pointer",
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

function Navbar({ toggleDrawer }) {
    const navigate = useNavigate();
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
                        <Typography
                            onClick={() => navigate("/")}
                            variant="h6"
                            className={classes.title}
                        >
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
                                    src={loggedInUser.photoURL}
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
                        <IconButton
                            onClick={toggleDrawer(true)}
                            edge="start"
                            className={classes.menuButton}
                            color="inherit"
                            aria-label="menu"
                        >
                            <MenuIcon />
                        </IconButton>
                    </Toolbar>
                </AppBar>
            </div>
        </>
    );
}

export default Navbar;
