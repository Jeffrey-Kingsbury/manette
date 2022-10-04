import { userContext } from "../../UserContext";
import { useContext, useEffect } from "react";
import Loading from "../Loading";
import styled from "styled-components";
import YourBugsGraph from "./DashboardComponents/YourBugsGraph";
import AllBugsGraph from "./DashboardComponents/AllBugsGraph";
import ActivityFeed from "./DashboardComponents/ActivityFeed";

const Dashboard = () => {
    const { userAuthenticated, validate } = useContext(userContext);

    useEffect(() => {
        validate();
    }, []);

    return (
        <Wrapper>
            {!userAuthenticated && <Loading />}
            {userAuthenticated && (
                <>
                    <DashboardWrapper>
                        <YourBugsWrapper>
                            List of the bugs created by the current user
                        </YourBugsWrapper>

                        <RightSideWrapper>
                            <ActivityFeed />

                            <GraphWrapper>
                                <BugsGraphWrapper>
                                <GraphTitle>All bugs</GraphTitle>
                                    <AllBugsGraph />
                                </BugsGraphWrapper>

                                <BugsGraphWrapper>
                                    <GraphTitle>Your bugs</GraphTitle>
                                    <YourBugsGraph />
                                </BugsGraphWrapper>
                            </GraphWrapper>
                        </RightSideWrapper>
                    </DashboardWrapper>
                </>
            )}
        </Wrapper>
    );
};

const Wrapper = styled.div`
  height: calc(100vh - 4rem); //Factoring in the size of the header.
  width: 100vw;
  display: flex;
  position: relative;
  justify-content: center;
  align-items: center;
`;

const DashboardWrapper = styled.div`
  height: 98%;
  width: 98%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: rgba(255, 255, 255, 0.5);
  border-radius: 15px;
  overflow-y: auto;
  overflow-x: hidden;
`;

const YourBugsWrapper = styled.div`
  width: 45%;
  max-width: 700px;
  height: 95%;
  background-color: white;
  border-radius: 15px;
  box-shadow: 1px 5px 15px 5px rgba(0, 0, 0, 0.3);
  margin: 0 1rem;
`;

const RightSideWrapper = styled.div`
  width: 100%;
  height: 95%;
  display: flex;
  justify-content: space-around;
  flex-direction: column;
`;

const GraphWrapper = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-around;
  align-items: center;
`;

const GraphTitle = styled.h1`
width: 100%;
height: 2rem;
display: flex;
justify-content: center;
align-items: center;
font-size: x-large;
padding: .25rem 0;
box-shadow: 0 0 5px 5px rgba(0,0,0,0.3);
background-color: #A691DB;
color:white;
`;

const BugsGraphWrapper = styled.div`
  width: 45%;
  height: 500px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  overflow: hidden;
  background-color: white;
  border-radius: 15px;
  box-shadow: 1px 5px 15px 5px rgba(0, 0, 0, 0.3);
`;

export default Dashboard;
