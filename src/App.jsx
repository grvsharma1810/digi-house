import "./App.css";
import React from "react";
import { Routes, Route } from "react-router-dom";
import Navbar from "./shared-components/Navbar";
import PrivateRoute from "./shared-components/PrivateRoute";
import Home from "./pages/Home/Home";
import LoginError from "./pages/LoginError/LoginError";
import CreateRoom from "./pages/CreateRoom/CreateRoom";
import YourChatrooms from "./pages/YourChatrooms/YourChatrooms";
import RoomDetails from "./pages/RoomDetails/RoomDetails";
import ChatRoom from "./pages/ChatRoom/ChatRoom";
import Drawer from "./shared-components/Drawer";
import Participants from "./pages/Participants/Participants";
import SavedChatrooms from "./pages/SavedChatrooms/SavedChatrooms";

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
        <div style={{ height: "100%" }}>
            <Navbar toggleDrawer={toggleDrawer} />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/rooms/:roomId" element={<RoomDetails />} />
                <Route path="/rooms/:roomId/chats" element={<ChatRoom />} />
                <Route
                    path="/rooms/:roomId/participants"
                    element={<Participants />}
                />
                <PrivateRoute path="/create-room" element={<CreateRoom />} />
                <PrivateRoute
                    path="/your-chatrooms"
                    element={<YourChatrooms />}
                />
                <PrivateRoute
                    path="/saved-chatrooms"
                    element={<SavedChatrooms />}
                />
                <Route path="/login-error" element={<LoginError />} />
            </Routes>
            <Drawer drawerOpen={drawerOpen} toggleDrawer={toggleDrawer} />
        </div>
    );
}

export default App;
