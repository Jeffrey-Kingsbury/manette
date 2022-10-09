import { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router";

export const userContext = createContext();

const UserContext = ({ children }) => {
    const [userAuthenticated, setUserAuthenticated] = useState(false);
    const [projectData, setProjectData] = useState(false);
    const [allUserData, setAllUserData] = useState(false);
    const [currentUserData, setCurrentUserData] = useState({profile:{firstName:"", lastName:"", avatarSrc:""}});
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
                setCurrentUserData(res.currentUserData.profile);
                setUserAuthenticated(true);
                return res.currentUserData.profile;
            });
    };

    const handleLogout = async() =>{
        await fetch('/logout');
        navigate("/login");
    };

    useEffect(()=>{
        const getProjectData = async() =>{
            return await fetch('/projectData')
            .then(res => res.json())
            .then(res => setProjectData(res.data[0].projects))
        }
        getProjectData();
    }, [userAuthenticated]);

    useEffect(()=>{
        const getAllUserData = async() =>{
            return await fetch('/getUsers')
            .then(res => res.json())
            .then(res => setAllUserData(res.data))
        }
        getAllUserData();
    }, [projectData]);

    return (
        <userContext.Provider
            value={{ userAuthenticated, currentUserData, allUserData, setUserAuthenticated, validate, handleLogout, projectData }}
        >
            {children}
        </userContext.Provider>
    );
};

export default UserContext;
