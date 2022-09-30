import { userContext } from "../../UserContext";
import { useContext, useEffect } from "react";
import Loading from "../Loading";

const Dashboard = () => {
    const { userAuthenticated, validate } = useContext(userContext);

    useEffect(() => {
        validate();
    }, []);

    return <>
        {!userAuthenticated &&
            <Loading />
        }
        {userAuthenticated &&
            <>
            
            </>
        }
    </>;
};

export default Dashboard;
