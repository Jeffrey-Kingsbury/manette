import { userContext } from "../../UserContext";
import { useContext, useEffect, useState } from "react";
import Loading from "../Loading";
import styled from "styled-components";
import YourBugsGraph from "./DashboardComponents/YourBugsGraph";
import AllBugsGraph from "./DashboardComponents/AllBugsGraph";
import ActivityFeed from "./DashboardComponents/ActivityFeed";

const Dashboard = () => {
  const { userAuthenticated, validate, currentUserData } = useContext(userContext);
  const [userOpenTickets, setUserOpenTickets] = useState(false);
  useEffect(() => {
    validate().then(e => {
      const getTickets = async () => {
        await fetch(`/getalltickets/user/${e.username}`)
          .then((res) => res.json())
          .then((res) => {
            if (res.status === 200) {
              setUserOpenTickets(res.data);
            }
          });
  
        }
        getTickets();
    });




  }, []);


  return (
    <Wrapper>
      {!userAuthenticated && <Loading />}
      {userAuthenticated && (
        <>
          <DashboardWrapper>
            <YourBugsWrapper>
              <Title>Your open tickets</Title>
              <YouBugsContainer>
                {
                  userOpenTickets && currentUserData && 
                  Object.keys(userOpenTickets).map(e =>{
                  if(userOpenTickets[e].status !== 'closed'){
                    return <YourBugsIndividualWrapper key={userOpenTickets[e].ticketId} href={`/ticket/${userOpenTickets[e].ticketId}`}>
                      <YourBugsIndividualIdContainer>
                      <p>{userOpenTickets[e].ticketId}</p>
                      <Small>{userOpenTickets[e].status}</Small>
                      </YourBugsIndividualIdContainer>
                      <YourBugsIndividualNameContainer>
                      <p>{userOpenTickets[e].summary}</p>
                      <Small>Submitted on: {userOpenTickets[e].submittedDate}</Small>
                      </YourBugsIndividualNameContainer>
                    </YourBugsIndividualWrapper>
                  }
                })}
                {!userOpenTickets && currentUserData && "Nothing to see here yet."}

              </YouBugsContainer>
            </YourBugsWrapper>

            <RightSideWrapper>
              <ActivityFeed />

              <GraphWrapper>
                <BugsGraphWrapper>
                  <Title>All tickets</Title>
                  <AllBugsGraph />
                </BugsGraphWrapper>

                <BugsGraphWrapper>
                  <Title>Your tickets</Title>
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
const Small = styled.p`
font-size: smaller;
margin: 0.25rem 0;
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
  overflow: hidden;
`;

const YouBugsContainer = styled.div`
width: 100%;
height: 100%;
`;

const YourBugsIndividualWrapper = styled.a`
width: 100%;
height: 4rem;
border-bottom: 2px solid;
display: flex;
justify-content: space-between;
align-items: center;
cursor: pointer;
transition: all .2s ease-in-out;
&:hover{
  transform: scale(1.03);
}
`;

const YourBugsIndividualIdContainer = styled.div`
display: flex;
flex-direction: column;
width: 30%;
height: 100%;
justify-content: center;
align-items: center;
`;

const YourBugsIndividualNameContainer = styled.div`
width: 100%;
height: 100%;
display: flex;
flex-direction: column;
justify-content: center;
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

const Title = styled.h1`
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
user-select: none;
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
