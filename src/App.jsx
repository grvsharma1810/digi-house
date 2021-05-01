import "./App.css";
import { Routes, Route } from "react-router-dom";
import Navbar from "./shared-components/Navbar";
import PrivateRoute from "./shared-components/PrivateRoute";
import Home from "./pages/Home/Home";
import LoginError from "./pages/LoginError/LoginError";
import CreateRoom from "./pages/CreateRoom/CreateRoom";

function App() {
    return (
        <div className="App">
            <Navbar />
            <Routes>
                <Route path="/" element={<Home />} />
                <PrivateRoute path="/create-room" element={<CreateRoom />} />
                <Route path="/login-error" element={<LoginError />} />
            </Routes>
        </div>
    );
}

export default App;
