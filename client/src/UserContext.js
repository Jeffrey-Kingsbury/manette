import { createContext, useState } from "react";
import { useNavigate } from "react-router";

export const userContext = createContext();

const UserContext = ({ children }) => {
    const [userAuthenticated, setUserAuthenticated] = useState(false);
    const [userData, setUserData] = useState({profile:{firstName:"", lastName:"", avatarSrc:""}});
    const navigate = useNavigate();

    const validate = async () => {
        return await fetch("/verifyToken")
            .then((res) => res.json())
            .then((res) => {
                if (res.status === 401) {
                    setUserAuthenticated(false);
                    navigate("/login");
                    return false;
                }
                setUserData(res.userData);
                setUserAuthenticated(true);
                return true;
            });
    };

    const handleLogout = async() =>{
        await fetch('/logout');
        navigate("/login");
    };

    return (
        <userContext.Provider
            value={{ userAuthenticated, userData, setUserAuthenticated, validate, handleLogout }}
        >
            {children}
        </userContext.Provider>
    );
};

export default UserContext;
