import { userContext } from "../../UserContext";
import { useContext, useEffect } from "react";
import Loading from "../Loading";
import Header from "./Header";

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
            <Header />
            
            </>
        }
    </>;
};

export default Dashboard;
