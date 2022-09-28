import { userContext } from "../../UserContext";
import { useContext, useEffect } from "react";
import { Navigate, useNavigate } from "react-router";

const Dashboard = () => {
    const { userAuthenticated, validate } = useContext(userContext);
    const navigate = useNavigate();

    useEffect(() => {
        validate().then((data) => {
            if (!data) {
                navigate('/');
            }
        });
    }, []);

    return (
        <>
            {userAuthenticated && <>Hello World</>}
        </>
    );
};

export default Dashboard;