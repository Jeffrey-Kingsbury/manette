import { createContext, useState, useEffect } from "react";
import { Navigate, useNavigate } from "react-router";

export const userContext = createContext();

const UserContext = ({ children }) => {
    const [userAuthenticated, setUserAuthenticated] = useState(false);
    const navigate = useNavigate();

    const validate = async () => {
        return await fetch("/verifyToken")
            .then((res) => res.json())
            .then((res) => {
                if (res.status === 401) {
                    setUserAuthenticated(false);
                    navigate("/");
                    return false;
                }
                setUserAuthenticated(true);
                return true;
            });
    };

    return (
        <userContext.Provider
            value={{ userAuthenticated, setUserAuthenticated, validate }}
        >
            {children}
        </userContext.Provider>
    );
};

export default UserContext;
