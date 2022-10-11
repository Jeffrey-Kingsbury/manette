import { useState } from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router";
import styled from "styled-components";
import Loading from "../Loading";

const AllBugs = () => {
    const [ticketData, setTicketData] = useState(false);
    const [sortedTicketData, setSortedTicketData] = useState(false);
    const navigate = useNavigate();
    const filterTickets = () => { };

    useEffect(() => {
        const getAllTickets = async () => {
            await fetch("/getalltickets")
                .then((res) => res.json())
                .then((res) => {
                    setTicketData(res.data);
                    setSortedTicketData(res.data);
                });
        };

        getAllTickets();
    }, []);

    return (
        <Wrapper>
            <TicketContainer>
              {!ticketData && <Loading/>}
                {ticketData &&
                    ticketData.map((e) => {
                        return (
                            <IndividualTicketContainer key={e._id} onClick={()=>{navigate(`/ticket/${e.ticketId}`)}}>
                                <TicketIdCont>
                                    <TicketId>#{e.ticketId}</TicketId>
                                    {e.status}
                                    <br />
                                    {e.department}
                                </TicketIdCont>

                                <TicketDataCont>
                                    <TicketDetails>{e.summary}</TicketDetails>
                                    <TicketDetails>{e.platform}</TicketDetails>
                                    <TicketDetails>
                                        <p>Severity: {e.severity} </p>
                                    </TicketDetails>
                                </TicketDataCont>
                                <TicketDataCont>
                                    <TicketDetails>
                                        <p>Submitted: {e.submittedDate}</p>
                                    </TicketDetails>
                                    <TicketDetails>
                                        <p>Assignee: {e.assignee}</p>
                                    </TicketDetails>
                                </TicketDataCont>
                            </IndividualTicketContainer>
                        );
                    })}
            </TicketContainer>
        </Wrapper>
    );
};

const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const TicketContainer = styled.ul`
  min-width: 60%;
  max-width: 75%;
  height: 80%;
  background-color: white;
  margin-right: 1rem;
  overflow-y: scroll;
  overflow-x: hidden;
  display: flex;
  flex-direction: column;
  border-radius: 15px;
  box-shadow: 3px 0 15px 5px rgba(0, 0, 0, 0.3);
  padding: .5rem;
`;

const IndividualTicketContainer = styled.li`
  width: 100%;
  height: 5rem;
  border: 2px solid #A691DB;
  border-radius: 5px;
  position: relative;
  display: flex;
  cursor: pointer;
  background-color: white;
  margin: .05rem 0;
  &:hover{
    background-color: rgb(250,250,250);
  }
`;

const TicketIdCont = styled.div`
  width: 15%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  text-align: center;
`;

const TicketId = styled.h1`
  font-size: larger;
  text-decoration: underline;
`;

const TicketDataCont = styled.div`
  width: 60%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;
`;

const TicketDetails = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-around;
`;
const FilterContainer = styled.div`
  width: 20%;
  height: 80%;
  background-color: white;
  box-shadow: 3px 0 15px 5px rgba(0, 0, 0, 0.3);
  border-radius: 15px;
  padding: .5rem;
`;

export default AllBugs;
