import "./App.css";
import React from "react";
import { Routes, Route } from "react-router-dom";
import Navbar from "./shared-components/Navbar";
import PrivateRoute from "./shared-components/PrivateRoute";
import Home from "./pages/Home/Home";
import LoginError from "./pages/LoginError/LoginError";
import CreateRoom from "./pages/CreateRoom/CreateRoom";
import Drawer from "./shared-components/Drawer";
import YourChatrooms from "./pages/YourChatrooms/YourChatrooms";

function App() {
    const [drawerOpen, setDrawerOpen] = React.useState(false);
    const toggleDrawer = (drawerStatus) => (event) => {
        if (
            event &&
            event.type === "keydown" &&
            (event.key === "Tab" || event.key === "Shift")
        ) {
            return;
        }

        setDrawerOpen(drawerStatus);
    };

    return (
        <div className="App">
            <Navbar toggleDrawer={toggleDrawer} />
            <Routes>
                <Route path="/" element={<Home />} />
                <PrivateRoute path="/create-room" element={<CreateRoom />} />
                <PrivateRoute
                    path="/your-chatrooms"
                    element={<YourChatrooms />}
                />
                <Route path="/login-error" element={<LoginError />} />
            </Routes>
            <Drawer drawerOpen={drawerOpen} toggleDrawer={toggleDrawer} />
        </div>
    );
}

export default App;
