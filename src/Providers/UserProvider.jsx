import { createContext, useState, useContext } from "react";
import { auth } from "../firebase";

const UserContext = createContext(null);

export const UserProvider = ({ children }) => {
    const [loggedInUser, setLoggedInUser] = useState(null);

    auth.onAuthStateChanged((user) => {
        if (user) {
            console.log("user looged in");            
            setLoggedInUser(user);
            console.log(user);
        } else {
            setLoggedInUser(null);
            console.log("user logger out");
        }
    });

    return (
        <UserContext.Provider value={{ loggedInUser, setLoggedInUser }}>
            {children}
        </UserContext.Provider>
    );
};

export const useUser = () => useContext(UserContext);
